import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error:`, error);
    process.exit(1);
  }
};

export default connectDB;
