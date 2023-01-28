import { Name } from "../Shared/Name";
import { Email } from "./Email";
import { Password } from "./Password";
import { User } from "./User";
import { Expenditure } from "./Expenditure";

/**
 * Association
 */
export class Association extends User {

  /**
   * Association description
   */
  private description: string;

  /**
   * Association counter of donations received
   */
  private donationsReceivedCounter: number;

  /**
   * Association total amount of donations received in ether
   */
  private totalCoinReceived: number;

  /**
   * Association expenditure list
   */
  public expendituresList: Array<Expenditure>;

  /**
   * 
   * @param id ID
   * @param description Description 
   * @param name Name
   * @param password Password
   * @param email Email
   * @param role Role (Donator or Association)
   * @param publicAddress Public address in the blockchain
   * @param currentEther Current amount of ether in account
   * @param donationsReceivedCounter Counter of number of donations received
   * @param totalCoinReceived Total amount of ether received
   * @param expendituresList List of expenditures
   */
  constructor(
    id: string,
    description: string,
    name: Name,
    password: Password,
    email: Email,
    role: string,
    publicAddress: string,
    currentEther: number,
    donationsReceivedCounter: number,
    totalCoinReceived: number,
    expendituresList: Array<Expenditure>
  ) {
    super(id, name, password, email, role, publicAddress, currentEther);
    this.description = description;
    this.donationsReceivedCounter = donationsReceivedCounter;
    this.totalCoinReceived = totalCoinReceived;
    this.expendituresList = expendituresList;
  }

  /**
   * Method to get the ID
   * @returns ID
   */
  public getID(): string {
    return super.getID();
  }

  /**
   * Method to get the Name
   * @returns Name
   */
  public getName(): Name {
    return super.getName();
  }

  /**
   * Method to get the Password
   * @returns Password
   */
  public getPassword(): Password {
    return super.getPassword();
  }

  /**
   * Method to get the Email
   * @returns Email
   */
  public getEmail(): Email {
    return super.getEmail();
  }

  /**
   * Method to get the Description
   * @returns Description
   */
  public getDescription(): string {
    return this.description;
  }

  /**
   * Method to get the counter of donations received
   * @returns Counter of donations received
   */
  public getDonationsReceivedCounter(): number {
    return this.donationsReceivedCounter;
  }

  /**
   * Method to get the amount of ether received in donations
   * @returns Amount of ether received in donations
   */
  public getTotalCoinReceived(): number {
    return this.totalCoinReceived;
  }

  /**
   * Method to get the expenditure list
   * @returns Expenditure list
   */
  public getExpenditureList(): Array<Expenditure> {
    return this.expendituresList;
  }
}
