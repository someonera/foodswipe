import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MealsService } from '../src/meals/meals.service';
import { MealsModule } from '../src/meals/meals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from '../src/meals/entities/meal.entity';

import * as dotenv from 'dotenv';
dotenv.config();

describe( 'AppController (e2e)', () =>
{
  let app: INestApplication;
  let mealRepository: Repository<Meal>;


  beforeAll( async () =>
  {
    try
    {
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
            synchronize: true,
          } ) ]
      } )
        // .overrideProvider(MealsService)
        // .useValue(mealsService)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
      mealRepository = moduleRef.get( 'MealRepository' );

    } catch ( err )
    {
      console.log( err );
    }
  } );

  it( 'GET /meals', async () =>
  {
    try
    {
      const res = await request.agent( app.getHttpServer() )
        .get( '/meals' )
        .set( 'Accept', 'application/json' )
        .expect( 'Content-Type', /json/ )
      expect(res.status).toBe(200)
      expect( res.body.length ).toEqual( 1 );
    } catch ( err )
    {
      console.log( err );
    }
  } );

  // afterEach( async () =>
  // {
  //   await mealRepository.query( `DELETE FROM meal` );
  // } );

  afterAll( async () =>
  {
    await app.close();
  } );

} );
