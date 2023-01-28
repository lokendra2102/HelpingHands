import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDonationModel extends Document {
  id: string;
  value: number;
  description: string;
  date: string;
  transactionId: string;
  donatorId: string;
  associationId: string;
}

const lotSchema = new Schema({
  value: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  transactionId: { type: String, required: true },
  donatorId: { type: String, required: true },
  associationId: { type: String, required: true },
});

export default mongoose.model<IDonationModel>("Donation", lotSchema);
