import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected successfully`);
    }
    catch (err) {
        console.log("Error connection at MongoDB : ",err);
        process.exit(1); // 1 status code means fail and 0 for successfull
    }
}
export default connectDB;