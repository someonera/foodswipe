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
      console.log( 'setting up module' );
      const moduleRef: TestingModule = await Test.createTestingModule( {
        imports: [ AppModule,
          TypeOrmModule.forRoot( {
            type: 'postgres',
            host: 'localhost',
            username: process.env.USERNAME,
            database: 'foodswipe_e2e_test',
            port: 5432,
            entities: [ './**/*.entity.ts' ],
            dropSchema: false,
            synchronize: true,
          } ) ]
      } )
        .compile();

      app = moduleRef.createNestApplication();
      // app.useGlobalPipes(new ValidationPipe())
      await app.init();

      restaurantRepository = moduleRef.get( 'RestaurantRepository' );
      mealRepository = moduleRef.get( 'MealRepository' );
      orderRepository = moduleRef.get( 'OrderRepository' );


    } catch ( err ) {
      console.log( err );
    }
  } );

  // it( 'POST /restaurants/register', async () => {
  //   try {
  //     const res = await request.agent( app.getHttpServer() )
  //       .post( '/restuarants/register' )
  //       .send( {
  //         email: 'test@email.com',
  //         name: 'food place',
  //         password: 'password',
  //         latitude: 34.45466,
  //         longitude: -0.4534564
  //       } )
  //     expect(res.status).toBe(201)
  //   } catch ( err ) {
  //     console.log( err );
  //   }
  // } );

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
      expect( res.body.length ).toEqual( 1 );
    } catch ( err ) {
      console.log( err );
    }
  } );



  afterAll( async () => {
    await app.close();
  } );

} );
