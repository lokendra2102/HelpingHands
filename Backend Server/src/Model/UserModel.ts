import mongoose, { Schema, Document, Model } from "mongoose";
import AssociationModel, { IAssociationModel } from "./AssociationModel";
import DonatorModel, { IDonatorModel } from "./DonatorModel";

/**
 * DB Model for a User. Every user has the association and donator field, and depending on their role, one of them is null.
 */
export interface IUserModel extends Document {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  publicAddress: string, 
  currentEther: number,
  donator: IDonatorModel;
  association: IAssociationModel;
}

const associationSchema = new Schema({
  description: { type: String, required: true },
  donationsReceivedCounter: { type: Number, required: true },
  totalCoinReceived: { type: Number, required: true },
  expenditureList: { type: Array, ref: "Expenditure", required: true },
});

const donatorSchema = new Schema({
  country: { type: String, required: true },
  donationsSentCounter: { type: Number, required: true },
  totalCoinDonated: { type: Number, required: true },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  publicAddress: { type: String, required: true },
  currentEther: { type: Number, required: true },
  donator: donatorSchema,
  association: associationSchema,
});

export default mongoose.model<IUserModel>("User", userSchema);
