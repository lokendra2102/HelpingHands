import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExpenditureModel extends Document {
  id: string;
  value: number;
  justification: string;
  date: string;
  transactionId: string;
}

const lotSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  justification: { type: String, required: true },
  date: { type: String, required: true },
  transactionId: { type: String, required: true },
});

export default mongoose.model<IExpenditureModel>("Expenditure", lotSchema);
