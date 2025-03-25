import mongoose from 'mongoose'

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to Db')
    })
    .catch((err)=>{
        console.log({
            message:"Fail to connect to db",
            error: err
        })
    })
}

export default connectToDB;