import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MealsService } from '../src/meals/meals.service';
import { MealsModule } from '../src/meals/meals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from '../src/meals/entities/meal.entity';

import * as dotenv from 'dotenv';
import {Restaurant} from '../src/restaurants/entities/restaurant.entity';
import {Order} from '../src/orders/entities/order.entity';
dotenv.config();

describe( 'AppController (e2e)', () => {
  let app: INestApplication;
  let restaurantRepository: Repository<Restaurant>
  let mealRepository: Repository<Meal>;
  let orderRepository: Repository<Order>

  beforeAll( async () => {
    try {
      const moduleRef: TestingModule = await Test.createTestingModule( {
        imports: [ AppModule,
          TypeOrmModule.forRoot( {
            type: 'postgres',
            host: 'localhost',
            username: process.env.USERNAME,
            database: 'foodswipe_e2e_test',
            port: 5432,
            entities: [ './**/*.entity.ts' ],
            dropSchema: true,
            synchronize: true,
          } ) ]
      } )
        .compile();

      app = moduleRef.createNestApplication();
      app.useGlobalPipes(new ValidationPipe())
      await app.init();

      restaurantRepository = moduleRef.get( 'RestaurantRepository' );
      mealRepository = moduleRef.get( 'MealRepository' );
      orderRepository = moduleRef.get( 'OrderRepository' );

    } catch ( err ) {
      console.log( err );
    }
  } );

  describe('registering a new user', () => {
    it( 'POST /restaurants/register', async () => {
      try {
        const res = await request.agent( app.getHttpServer() )
          .post( '/restaurants/register' )
          .send( {
            email: 'test@email.com',
            name: 'food place',
            password: 'password',
            latitude: 34.45466,
            longitude: -0.4534564
          } )
        expect(res.status).toBe(201)
      } catch ( err ) {
        console.log( err );
      }
    } );

  })

  describe('registered user actions', () => {

    it( 'POST /restaurants/login', async () => {
        try {
      const res = await request.agent( app.getHttpServer() )
        .post( '/restaurants/login' )
        .send( {
          email: 'test@email.com',
          password: 'password'
        } )
      expect(res.status).toBe(201)
      } catch ( err ) {
        console.log( err );
      }
    } );

    it( 'POST /meals', async () => {
      try {
        const res = await request.agent( app.getHttpServer() )
          .post( '/meals' )
          .send( {
            name: 'food',
            price: 1.99,
            image_url: 'www.google.com',
            description: 'is food',
            restaurantId: 1
          } )
        expect(res.status).toBe(201)
      } catch ( err ) {
        console.log( err );
      }
    } );

    it( 'GET /meals', async () => {
      try {
        const res = await request.agent( app.getHttpServer() )
          .get( '/meals' )
        expect(res.status).toBe(200)
        expect(res.body.length).toEqual(1)
      } catch ( err ) {
        console.log( err );
      }
    } );

    it( 'GET /meals/restaurants/:id', async () => {
      try {
        const res = await request.agent( app.getHttpServer() )
          .get( '/meals/restaurants/1' )
        expect(res.status).toBe(200)
        expect(res.body.length).toEqual(1)
      } catch ( err ) {
        console.log( err );
      }
    } );

    it( 'GET /meals/:id', async () => {
      try {
        const res = await request.agent( app.getHttpServer() )
          .get( '/meals/1' )
        expect(res.status).toBe(200)
        expect( res.body.id ).toEqual(1)
      } catch ( err ) {
        console.log( err );
      }
    } );

    it( 'PATCH /meals/:id', async () => {
      try {
        const res = await request.agent( app.getHttpServer() )
          .patch( '/meals/1' )
          .send( {
            name: 'new food'
          } )
        expect(res.status).toBe(200)
        expect(res.body.name).toEqual('new food')
      } catch ( err ) {
        console.log( err );
      }
    } );

  })




  afterAll( async () => {
    await app.close();
  } );

} );
