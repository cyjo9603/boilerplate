import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

const prod = process.env.NODE_ENV === 'production';

class App {
  public app;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  private middlewares() {
    if (prod) {
      this.app.use(helmet());
      this.app.use(hpp());
      this.app.use(logger('combined'));
    } else {
      this.app.use(logger('dev'));
    }

    this.app.use(cookieParser());
    this.app.use(compression());
  }
}

export default new App().app;
