import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST as string;

export default async (): Promise<void> => {
  const connect = async () => {
    try {
      await mongoose.connect(DB_HOST, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('mongo db connected');
    } catch (error) {
      console.error(error);
    }
  };

  await connect();
  mongoose.connection.on('disconnected', connect);
};
