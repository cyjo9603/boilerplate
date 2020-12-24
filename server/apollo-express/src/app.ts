import { ApolloServer, CorsOptions } from 'apollo-server-express';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import schema from '@config/schema';

const GRPAHQL_ENDPOINT = '/graphql';
const prod = process.env.NODE_ENV === 'production';

class App {
  public app;

  private apollo;

  constructor() {
    this.app = express();
    this.apollo = new ApolloServer({
      context: ({ req, res }) => ({ req, res }),
      playground: !prod,
      schema,
    });
    this.middlewares();
  }

  private middlewares() {
    const corsOptions: CorsOptions = { credentials: true };
    if (prod) {
      this.app.use(helmet());
      this.app.use(hpp());
      this.app.use(logger('combined'));
      corsOptions.origin = /user-domain\.com$/;
    } else {
      this.app.use(logger('dev'));
      corsOptions.origin = true;
    }

    this.app.use(cookieParser());
    this.app.use(compression());

    this.apollo.applyMiddleware({
      app: this.app,
      path: GRPAHQL_ENDPOINT,
      cors: corsOptions,
    });
  }
}

export default new App().app;
