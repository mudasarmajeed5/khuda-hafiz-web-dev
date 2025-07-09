import mongoose from "mongoose"
const connectDB = async() => {
    try {
        if(!process.env.MONGO_URI){
            console.log("MONGODB Connection not defined");
            return;
        }
        if(mongoose.connections[0].readyState == 1){
            return;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Connected successfully");
    } catch (error) {
        console.error("Mongodb Connection error",error);
        process.exit(1);
    }
}
export default connectDB; 
