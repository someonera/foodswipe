<p align="center">
<img width="1000" alt="Foodswipe logo" src="https://github.com/jachamberlain86/content-assets/blob/c4ff89ad7d9f5dc12ce889feb0a6344eb4d5e01e/foodswipe-logo.png">
</p>

<code><img alt="Angular" src="https://img.shields.io/badge/-Angular-DD0031?logo=angular&logoColor=white&style=for-the-badge"></code>
<code><img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge"></code>
<code><img alt="CSS3" src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge"></code>
<code><img alt="Firebase" src="https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black&style=for-the-badge"></code>
<code><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge"></code>
<code><img alt="NestJS" src="https://img.shields.io/badge/-NestJS-E0234E?logo=nestJS&logoColor=white&style=for-the-badge"></code>
<code><img alt="TypeORM" src="https://img.shields.io/badge/-TypeORM-E83524?logo=typeorm&logoColor=white&style=for-the-badge"></code>
<code><img alt="Jest" src="https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white&style=for-the-badge"></code>
<code><img alt="Cypress" src="https://img.shields.io/badge/-Cypress-17202C?logo=cypress&logoColor=white&style=for-the-badge"></code>
<code><img alt="Testing Library" src="https://img.shields.io/badge/-Testing%20Library-E33332?logo=testing-library&logoColor=white&style=for-the-badge"></code>

# Foodswipe: Eat what you're feeling!

Foodswipe is a food-delivery app that lives at the intersection of Deliveroo and Tinder. Instead of spending ages trawling through restaurant menus, only to find nothing that you fancy, get on Foodswipe! Foodswipe uses a "food-first" approach to show you a random selection of delicious meals within your delivery radius - just swipe to order! 

Foodswipe provides a double-ended interface for users and restaurants; restaurants can upload unlimited meal options, and then manage open and pending orders. Foodswipe's simple menu system makes it easy for restaurants to focus on the food. 

## The Task

The Foodswipe prototype was built in less than a week. We were brought in to review the code, start implement testing, and provide sugesstions for ways the product could be made more usable, more accessible, and the code more readable. As Foodswipe lacked comprehensive documentation, it was up to us to work out the shape of the app and how to get it running.

Our first step was to deal with the security risk presented through exposed environmental variables in the project's repo. We set up the project to use the dotenv library and secured exposed API keys. We also identified and fixed issues where paths for crucial API calls were mistakenly hard coded.

While the code quality was high in many areas, the decision to combine components for both the consumer and restaurant sides of Foodswipe into one Angular application removed a lot clarity client-side. We identified further room for improvement on the frontend, especially in refining the user journey, handling edge cases for user inputs, and following accessbility best practices.

Finally, we replaced Angular's built-in testing capabilities with Cypress, Jest, and Testing Library. This enabled us to begin creating more consistent unit, integration, and e2e testing across Foodswipe's front and back ends. Jest was favoured over Jasmine due to familiarity with it in the existing team.


## Tech Stack

FoodSwipe is written in TypeScript and built with:

**Front End** 
* [Angular](https://http://angular.io/)

**Back End**
* [Nest.JS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/#/)
* [PostgreSQL](https://www.postgresql.org/)


**Testing** 
* Unit - [Jest](https://jestjs.io/)
* Integration - [Testing Library](https://testing-library.com/docs/angular-testing-library/intro/)
* e2e - [Cypress](https://www.cypress.io/)

## Getting Started 

Run `git clone https://github.com/someonera/foodswipe.git`

Run `npm i` from the root folder

## Client 
For the front end: `npm i` in foodswipe-frontend, then `npm start` to handle the configuration of environmental variables from dotenv before the client is served.

## Connecting to Firebase

This requires credentials. Create a Firebase app through the Firebase console and add the credentials (FB_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID) to a .env at the root of /foodswipe-frontend (see .env.example)

A storage bucket also needs to be created on this account to handle storing meal images.

## Server
For the back end:  `npm i` in foodswipe-backend, then `npm start`.


## Connecting a PostgreSQL database

Uses a PostgreSQL database, so set up a local postgreSQL database called foodswipe and provide your PostrgreSQL USERNAME in an .env in /foodswipe-backend/src (see env.example).

## Running Foodswipe

On your localhost connection, adding '/login' to the path will navigate to the entry point for the rastaurant-facing app. Using the default path with automatically redirect to the customer-facing '/swipe'. The customer-facing app will show no result unless restaurants and menu items are available in the database.


## Reviewed By
| <img src="https://avatars.githubusercontent.com/u/74981447?v=4" width="70" alt="James"/> | <img src="https://avatars.githubusercontent.com/u/74319526?v=4" width="70" alt="Ro" />
--- | --- 
**James Chamberlain** | **Ro Thomas** 
[LinkedIn](https://www.linkedin.com/in/chambermade/) | [LinkedIn](https://www.linkedin.com/in/romthomas/) 
[GitHub](https://github.com/jachamberlain86) | [GitHub](https://github.com/someonera)
