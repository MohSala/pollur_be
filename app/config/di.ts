
import { config } from '../config/config';
import { serviceLocator } from '../lib/service_locator';

// module.exports = serviceLocator;
const winston = require('winston');
require('winston-daily-rotate-file');

// user services and controllers
import { UserServices } from '../services/user';
import { PollServices } from '../services/poll';
import { UserController } from '../controllers/user';
import { PollController } from '../controllers/poll';


const mongoose = require('mongoose');
const bluebird = require('bluebird');

/**
 * Returns an instance of logger
 */
serviceLocator.register('logger', () => {

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),

    defaultMeta: { service: 'movement-service' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' })

    ]
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),

    }));
  }
  return logger;
});


/**
 * Returns a Mongo connection instance.
 */

serviceLocator.register('mongo', (servicelocator) => {
  const connectionString =
    (!config.mongo.connection.username || !config.mongo.connection.password) ?
      `mongodb://${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.dbProd}` :
      `mongodb://${config.mongo.connection.username}:${config.mongo.connection.password}` +
      `@${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.dbProd}`;
  mongoose.Promise = bluebird;
  const mongo = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  mongo.then(() => {
    console.log('Mongo Connection Established', connectionString)
  }).catch(() => {
    console.log('Mongo Connection disconnected');
    process.exit(1);
  });

  return mongo;
});


/**
 * Creates an instance of the User Service
 */
serviceLocator.register('userService', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const mongoclient = servicelocator.get('mongo');
  return new UserServices(logger, mongoclient);
});


serviceLocator.register('pollService', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const mongoclient = servicelocator.get('mongo');
  return new PollServices(logger, mongoclient);
});


/**
 * Creates an instance of the user Controller
 */
serviceLocator.register('userController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const userService = servicelocator.get('userService');
  return new UserController(
    logger, userService
  );
});

serviceLocator.register('pollController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const pollService = servicelocator.get('pollService');
  return new PollController(
    logger, pollService
  );
});


export const serviceLocate = serviceLocator;