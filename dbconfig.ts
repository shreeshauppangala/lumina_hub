import mongoose from 'mongoose';

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const { connection } = mongoose;
    connection.on('connected', () => {
      console.log('⚡\x1b[92m Database Connected Successfully!\x1b[92m\x1b[0m⚡');
    });
    connection.on('error', (err) => {
      console.error(
        '\x1b[91m Database Connection failed:\x1b[91m',
        `\x1b[91m ${err} \x1b[91m \x1b[0m`,
      );
      process.exit();
    });
  } catch (error) {
    console.error(
      '\x1b[91m Could Not Connect to Database :\x1b[91m',
      `\x1b[91m ${err} \x1b[91m \x1b[0m`,
    );
  }
};
