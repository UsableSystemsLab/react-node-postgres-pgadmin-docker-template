import express, { json } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerConfigs from './configs/swaggerConfig.js';
import apiRoutes from './routes/index.js';
import { postgresDB } from './configs/postgresDB.js';
import errorHandling from './middlewares/errorHandling.js';
import accessLogging from './middlewares/accessLogging.js';
import logger from './configs/logger.js';

const app = express();
const port = process.env.API_SERVER_PORT || 4000;

// middlewares
app.use(cors());
app.use(json());
app.use(accessLogging);

// only requests to /api/* will be sent to our router
const router = express.Router();
apiRoutes(router);
app.use('/api', router);

// API docs
const swaggerUiOptions = {
  customSiteTitle: 'API Documentation',
  customCss: '.swagger-ui .topbar { display: none }',
};
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerConfigs, swaggerUiOptions),
);

app.use(errorHandling);

postgresDB().then(() => {
  app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
  });
});
