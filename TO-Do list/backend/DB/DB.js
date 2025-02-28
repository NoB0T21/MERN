import mongoose from 'mongoose';

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err.massage);
    })}
    
export default connectToDb; 
