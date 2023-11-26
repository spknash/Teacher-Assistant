import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI as string;

async function connectMongoDB() {
    try{
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB.');
    }
    catch(error){
        console.log(error);
    }
}

export default connectMongoDB;