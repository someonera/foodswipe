# foodswipe

## Frontend

Launch with 'npm start' for development or 'npm build' for production. Using 'ng serve' will not set environmental variables.

Connecting to Firebase requires credentials. Create a Firebase app through the Firebase console and add the credentials (FB_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID) to a .env at the root of /foodswipe-frontend. A storage bucket also needs to be created on this account to handle storing meal images.

## Backend

Launch with 'npm run start' for development.

Uses a PostgreSQL database. Set up a local postgreSQL database called foodswipe. Provide your PostrgreSQL USERNAME in a .env at the root of /foodswipe-backend.

