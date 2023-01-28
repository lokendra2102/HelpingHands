import { Entity } from "../Shared/Entity";

/**
 * Expenditure
 */
export class Expenditure extends Entity {
  
  /**
   * Expenditure value
   */
  public value: number;

  /**
   * Expenditure justification
   */
  public justification: string;

  /**
   * Expenditure date
   */
  public date: Date;

  /**
   * Expenditure transaction hash
   */
  public transactionId: string;

  /**
   * Constructor for expenditure
   * @param id ID
   * @param value Value 
   * @param justification Justification
   * @param date Date
   * @param transactionId Transaction hash 
   */
  constructor(id: string, value: number, justification: string, date: Date, transactionId: string) {
    super(id);
    this.value = value;
    this.justification = justification;
    this.date = date;
    this.transactionId = transactionId;
  }

  /**
   * Method to get the value
   * @returns Value
   */
  public getValue(): number {
    return this.value;
  }

  /**
   * Method to get the justification
   * @returns Justification
   */
  public getJustification(): string {
    return this.justification;
  }

  /**
   * Method to get the date
   * @returns Date
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Method to get the transaction hash
   * @returns Transaction hash
   */
  public getTransactionId(): string {
    return this.transactionId;
  }

  /**
   * Method to set the transaction hash
   * @param hash Transaction hash
   */
  public setTransactionId(hash: string): void {
    this.transactionId = hash;
  }
}
