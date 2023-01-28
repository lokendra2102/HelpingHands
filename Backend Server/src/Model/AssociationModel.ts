import mongoose, { Schema, Document, Model } from "mongoose";
import { IExpenditureModel } from "./ExpenditureModel";

export interface IAssociationModel extends Document {
  description: string;
  donationsReceivedCounter: number;
  totalCoinReceived: number;
  expenditureList: Array<IExpenditureModel>;
}

const associationSchema = new Schema({
  description: { type: String, required: true },
  donationsReceivedCounter: { type: Number, required: true },
  totalCoinReceived: { type: Number, required: true },
  expenditureList: { type: Array, ref: "Expenditure", required: true },
});

export default mongoose.model<IAssociationModel>("Association", associationSchema);
