
import mongoose from 'mongoose';


export const dbConnection = async (uri: string | undefined) => {
  if (!uri) {
    throw new Error('MONGO_URI not defined in environment variables.');
  }

  try
  {
    await mongoose.connect(uri);
    console.log('Connected to mongoDB...');
  }
  catch(err)
  {
    console.log(err);
    process.exit(1);
  }
}