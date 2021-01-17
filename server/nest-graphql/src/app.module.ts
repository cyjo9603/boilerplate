import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { HelloModule } from './hello/hello.module';

const prod = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_CONFIG!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      playground: !prod,
      autoSchemaFile: true,
      cors: {
        credentials: true,
        origin: prod ? /yourdomain\.com$/ : true,
      },
      context: (ctx) => ({ ...ctx }),
    }),
    HelloModule,
  ],
})
export class AppModule {}
