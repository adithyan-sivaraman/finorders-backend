import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const MONGO_USER = process.env.MONGO_USER
const MONGO_PWD = process.env.MONGO_PWD
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
const MONGO_DB = process.env.MONGO_DB

const cloudMongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

export const connection = async ()=>{
    try{
    await mongoose.connect(cloudMongoUrl,{
        useNewUrlParser: true,
        dbName:'orders'
    });
    console.log('connection established');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
    };

