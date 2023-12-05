import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI: string = process.env.MONGODB_URI as string;


async function connectMongoDB() {
    try{
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB.');
        
        return mongoose.connection.getClient();
    }
    catch(error){
        console.log(error);
    }
}

export default connectMongoDB;