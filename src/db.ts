import mongoose from 'mongoose'

const connectDB = async (uri: string) => {
    await mongoose.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
        //useNewUrlParser: true, useUnifiedTopology:true
    }, (err) => {
        console.log("don't work", err);
    }) 

    return mongoose.connection
}

export default connectDB

//  async run(): Promise<any>