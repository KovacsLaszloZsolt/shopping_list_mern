import app from './app';
import connectDB from './config/db';
const PORT = process.env.PORT || 3000;
const main = async (): Promise<void> => {
  void connectDB();
  app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`);
  });
};

main().catch(console.error);
