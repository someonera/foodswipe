const { writeFile } = require('fs');
const {argv} = require('yargs');
require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;

const environmentFileContent = `
export const environment = {
  production: ${isProduction},
  firebase: {
    apiKey: '${process.env.FB_API_KEY}',
    authDomain: '${process.env.AUTH_DOMAIN}',
    projectId: '${process.env.PROJECT_ID}',
    storageBucket: '${process.env.STORAGE_BUCKET}',
    messagingSenderId: '${process.env.MESSAGING_SENDER_ID}',
    appId: '${process.env.APP_ID}',
    measurementId: '${process.env.MEASUREMENT_ID}'
  }
};
`;

writeFile(targetPath, environmentFileContent, function <T> (err: T) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
})