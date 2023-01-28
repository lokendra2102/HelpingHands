import { Entity } from "../Shared/Entity";

export class Donation extends Entity {

  /**
   * Donation value
   */
  public value: number;

  /**
   * Donation description
   */
  public description: string;

  /**
   * Donation date
   */
  public date: Date;

  /**
   * Donation's transaction ID
   */
  public transactionId: string;

  /**
   * Donation's donator ID
   */
  public donatorId: string;

  /**
   * Donation's association ID
   */
  public associationId: string;

  /**
   * Constructor for Donation
   * @param id Donation id
   * @param value Donation value
   * @param description Donation description
   * @param date Donation date
   * @param transactionId Donation's transaction ID
   * @param donatorId Donation's donator ID
   * @param associationId Donation's association ID
   */
  constructor(
    id: string,
    value: number,
    description: string,
    date: Date,
    transactionId: string,
    donatorId: string,
    associationId: string
  ) {
    super(id);
    this.value = value;
    this.description = description;
    this.date = date;
    this.transactionId = transactionId;
    this.donatorId = donatorId;
    this.associationId = associationId;
  }

  /**
   * Method to get a donation's value
   * @returns Donation value
   */
  public getValue(): number {
    return this.value;
  }

  /**
   * Method to get a donation's value
   * @returns Donation description
   */
  public getDescription(): string {
    return this.description;
  }

  /**
   * Method to get a donation's date
   * @returns Donation date
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Method to get a donation's transaction ID
   * @returns Donation's transaction ID
   */
  public getTransactionId(): string {
    return this.transactionId;
  }

  /**
   * Method to get a donation's donator ID
   * @returns Donation's donator ID
   */
  public getDonatorID(): string {
    return this.donatorId;
  }

  /**
   * Method to get a donation's association ID
   * @returns Donation's association ID
   */
  public getAssociationId(): string {
    return this.associationId;
  }

  /**
   * Method to set a donation's transaction ID
   * @param transactionId Donation's transaction ID
   */
  public setTransactionId(transactionId: string): void {
    this.transactionId = transactionId;
  }

  /**
   * Method to set a donation's date
   * @param transactionId Donation's date
   */
  public setDate(date: Date): void {
    this.date = date;
  }
}
