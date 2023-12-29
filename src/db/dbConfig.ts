import mongoose from "mongoose"

export async function connect() {
    try {
        //since we are using TS: there is no gaurantee the given url will always resolve, but we know it will always resolve; hence, we use an exclamation mark
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDB connected sucessfully 😊");
        })

        connection.on("disconnected", () => {
            console.log("MongoDB disconnected 😞")
        })

        connection.on("error", () => {
            console.log("MongoDB connection error 🤯")
        })
        mongoose.connection.setMaxListeners(4);
    } catch (error) {
        console.log("something went wrong while db connection !!!");
        console.error(error);
    }
} 