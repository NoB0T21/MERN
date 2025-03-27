import mongoose from "mongoose";

const connectTODb = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log('connected to DB')})
    .catch((err) => {
        console.log({
            message: 'Fail to connect DB',
            error: err
        })
    });
};

export default connectTODb;