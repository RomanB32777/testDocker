import mongoose from 'mongoose'

const connectDB = async (uri: string) => {

    await mongoose.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
        //useNewUrlParser: true, useUnifiedTopology:true
    })

    return mongoose.connection
}

export default connectDB
