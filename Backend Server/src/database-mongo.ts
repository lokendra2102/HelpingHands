import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://seminars:seminars_password@cluster0.rj0if.mongodb.net/Seminars?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB.");
  } catch (e) {
    console.log("Error on MongoDB connection.");
    console.log(e);
  }
}

export default connectMongoDB;
