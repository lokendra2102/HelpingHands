import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDonatorModel extends Document {
  country: string;
  donationsSentCounter: number;
  totalCoinDonated: number;
}

const donatorSchema = new Schema({
  country: { type: String, required: true },
  donationsSentCounter: { type: Number, required: true },
  totalCoinDonated: { type: Number, required: true },
});

export default mongoose.model<IDonatorModel>("Donator", donatorSchema);
