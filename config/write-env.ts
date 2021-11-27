import * as fs from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

const dotenv = config()?.parsed;

const env = {
    firebase: {
      apiKey: process.env['FIREBASE_API_KEY'],
      authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
      databaseURL: process.env['FIREBASE_DATABASE_URL'],
      projectId: process.env['FIREBASE_PROJECT_ID'],
      storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
      messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
      appId: process.env['FIREBASE_APP_ID'],
      measurementId: process.env['FIREBASE_MESUREMENT_ID'],
    }
}

if (dotenv) {
    env.firebase.apiKey = dotenv['FIREBASE_API_KEY']
    env.firebase.authDomain = dotenv['FIREBASE_AUTH_DOMAIN']
    env.firebase.databaseURL = dotenv['FIREBASE_DATABASE_URL']
    env.firebase.projectId = dotenv['FIREBASE_PROJECT_ID']
    env.firebase.storageBucket = dotenv['FIREBASE_STORAGE_BUCKET']
    env.firebase.messagingSenderId = dotenv['FIREBASE_MESSAGING_SENDER_ID']
    env.firebase.appId = dotenv['FIREBASE_APP_ID']
    env.firebase.measurementId = dotenv['FIREBASE_MESUREMENT_ID']
}

// dynamic.tsに書き込み
const contents = 'export const dynamic = ' + JSON.stringify(env)
fs.writeFileSync(
  join(__dirname, '../src/environments/dynamic.ts'),
  contents
)
