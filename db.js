import mongoose from "mongoose";
import dns from "dns";

dns.setServers(['8.8.8.8']); // Fallback to Google DNS to fix ISP/Local DNS blocking SRV records


const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected");
        

    } catch (error) {
        console.log(error);
         process.exit(1);

    }

}


export default connectDB; 