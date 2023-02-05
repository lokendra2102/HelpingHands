import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://DBUSER:onlyalphabetsareallowed@loki.uiwh6.mongodb.net/HelpingHands?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB.");
  } catch (e) {
    console.log("Error on MongoDB connection.");
    console.log(e);
  }
}

export default connectMongoDB;
