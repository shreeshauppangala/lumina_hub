import mongoose from 'mongoose';

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const { connection } = mongoose;
    connection.on('connected', () => {
      console.log('Database connected');
    });
    connection.on('error', (err) => {
      console.error(err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};
