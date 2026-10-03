import monmgoose from "mongoose";

const connectDB = async () => {
    try {
        await monmgoose.connect(process.env.MONGO_URI, {
            dbName: "MERNAuth"
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error(`Failed to connect`);
    }
};

export default connectDB;