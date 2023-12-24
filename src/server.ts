import app from './app';
import mongoose from 'mongoose';
import config from './config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`app server listening on ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on('uncaughtException', () => {
  console.log('uncaughtException detected 😈, server closed 👻');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('unhandledRejection', () => {
  console.log('unhandledRejection detected 😈, server closed 👻');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
