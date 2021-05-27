# FoodSwipe: eat what you're feeling!

FoodSwipe is a food-delivery app that lives at the intersection of Deliveroo and Tinder. Don't spend ages trawling through restaurants, only to read their menu & find there's nothing you fancy. FoodSwipe uses a "food-first" approach to show you delicious meals within your delivery radius - just swipe to order! 

FoodSwipe provides a double-ended interface for users and restaurants; restaurants can upload unlimited meal options, manage open and pending orders. FoodSwipe makes it easy for them to focus on what they do best (cooking - at least we hope!). 

<code><img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge"></code>
<code><img alt="CSS3" src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge"></code>
<code><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white&style=for-the-badge"></code>
<code><img alt="TypeORM" src="https://img.shields.io/badge/-TypeORM-E83524?logoColor=white&style=for-the-badge"></code>
<code><img alt="Jest" src="https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white&style=for-the-badge"></code>


## Tech Stack

**Front End** 

FoodSwipe is written in TypeScript and built with 

* [Angular](https://http://angular.io/)

**Back End**
* [Nest.JS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/#/)
* [PostgreSQL](https://www.postgresql.org/)


**Testing** 
All end to end tests have been written using [Cypress](https://www.cypress.io/), with unit and integration tests in [Jest](https://jestjs.io/). 

## Getting Started 

Run `https://github.com/someonera/foodswipe.git`

Run `npm i` from the root folder

## Client 
For the front end: `npm i` in foodswipe-frontend, `npm i && npm start` in foodswipe-frontend/src

## Connecting to Firebase

This requires credentials. Create a Firebase app through the Firebase console and add the credentials (FB_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID) to a .env at the root of /foodswipe-frontend (see .env.example)

A storage bucket also needs to be created on this account to handle storing meal images.

## Server
For the back end:  `npm i` in foodswipe-backend, `npm i && npm run start:dev` (watch mode) or `npm run start:prod` (production mode) in foodswipe-backend/src


## Connecting a PostgreSQL database

Uses a PostgreSQL database, so set up a local postgreSQL database called foodswipe and provide your PostrgreSQL USERNAME in an .env in /foodswipe-backend/src (see env.example).



## Built By
| <img src="https://avatars.githubusercontent.com/u/74981447?v=4" width="70" alt="James"/> | <img src="https://avatars.githubusercontent.com/u/74319526?v=4" width="70" alt="Ro" />
--- | --- 
**James Chamberlain** | **Ro Thomas** 
[LinkedIn](https://www.linkedin.com/in/chambermade/) | [LinkedIn](https://www.linkedin.com/in/romthomas/) 
[GitHub](https://github.com/jachamberlain86) | [GitHub](https://github.com/someonera)
