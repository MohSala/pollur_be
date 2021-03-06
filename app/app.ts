import express from 'express';
const cors = require("cors")
import { userRouter } from './routes/user';
import { config } from './config/config';
// service locator via dependency injection
import { serviceLocate } from './config/di';
import helmet from 'helmet'
export const app = express();
const port = config.server.port;
app.use(cors());
app.use('/', userRouter);
app.use(helmet());
app.get('/', (req, res) => {
  res.send(`Welcome to ${config.appName}!`);
});


// Connect to mongodb
serviceLocate.get('mongo');

// Connect to logger
const logger = serviceLocate.get('logger');

app.listen(port, () => {
  logger.info(`${config.appName} is listening on port: ${port}`)
});
