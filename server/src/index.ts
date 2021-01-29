import { MockClerkServer } from './mock/mock-clerk-server';
import { Environment } from './helpers/environment';
/* --------------------
 * Third-party modules |
 * -------------------*/
import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import compression from 'compression';
import i18n from 'i18n';
import swaggerUi from 'swagger-ui-express';

// Application imports and helpers (part 1)
import logger from './helpers/logger';

// Reading env file, must place above anything else that use process.env
let envPath = path.join(
  __dirname,
  `../.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`
);
// Check for existence of env from NODE_ENV first
if (!fs.existsSync(envPath)) {
  envPath = path.join(__dirname, '../.env');
}

if (fs.existsSync(envPath)) {
  logger.info(`Using env from ${envPath}`);
  dotenv.config({ path: envPath });
}

// Application imports and helpers (part 2)

import swaggerDocument from './openapi.json';
import ClerkServer from './servers/clerk-server';
//import { caiApplicationInsights } from './helpers/cai-application-insights';

// Initializing...
const appPort = Number(process.env.APP_PORT || 4300);
const app: ClerkServer['app'] = new ClerkServer().app;
const appSession: session.SessionOptions = {
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || '5503a01dcabb69505a3c3fb99aa9c74a',
};
const appLanguage = process.env.APP_LANGUAGE || 'en';

/* ---------------------------
 * Express app configurations |
 * --------------------------*/
i18n.configure({
  defaultLocale: appLanguage,
  locales: ['en'],
  directory: path.join(__dirname, 'locales'),
  register: global,
  objectNotation: true,
});
app.set('port', appPort);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(appSession));
app.use(i18n.init);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
i18n.setLocale(appLanguage);
// error handler
// app.use(serverErrorHandler.getInstance().serverErrorHandler(err, Request, Response, next));
// caiApplicationInsights.getInstance();
/* ---------------------------------
 * Export or start the app instance |
 * --------------------------------*/
app.listen(appPort, () => {
  //caiApplicationInsights.getInstance();
  logger.info(`Your server is listening on port ${appPort} (http://localhost:${appPort})`);
  logger.info(`Swagger-ui is available on http://localhost:${appPort}/api-docs`);
});

if (Environment.getMockableStatus()) {
  const mockClerkServer = new MockClerkServer();
  mockClerkServer.start();
}
