import { Name } from "../Shared/Name";
import { Email } from "./Email";
import { Password } from "./Password";
import { User } from "./User";

/**
 * Donator
 */
export class Donator extends User {

  /**
   * Donator country of residence
   */
  private country: string;

  /**
   * Counter of the number of donations sent
   */
  private donationsSentCounter: number;

  /**
   * Amount of ether donated in ether
   */
  private totalCoinDonated: number;

  /**
   * Constructor for donator
   * @param id ID
   * @param country Country of residence 
   * @param name Name
   * @param password Password
   * @param email Email
   * @param role Role (Donator or Association)
   * @param publicAddress Public address in the blockchain
   * @param currentEther Current amount of ether in the account
   * @param donationsSentCounter Number of donations sent
   * @param totalCoinDonated Amount of ether donated
   */
  constructor(
    id: string,
    country: string,
    name: Name,
    password: Password,
    email: Email,
    role: string,
    publicAddress: string,
    currentEther: number,
    donationsSentCounter: number,
    totalCoinDonated: number
  ) {
    super(id, name, password, email, role, publicAddress, currentEther);
    this.country = country;
    this.donationsSentCounter = donationsSentCounter;
    this.totalCoinDonated = totalCoinDonated;
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
   * @returns 
   */
  public getName(): Name {
    return super.getName();
  }

  /**
   * Method to get the password
   * @returns Password
   */
  public getPassword(): Password {
    return super.getPassword();
  }

  /**
   * Method to get the email
   * @returns Email
   */
  public getEmail(): Email {
    return super.getEmail();
  }

  /**
   * Method to get the country
   * @returns Country
   */
  public getCountry(): string {
    return this.country;
  }

  /**
   * Method to get the number of donations sent
   * @returns Number of donations sent
   */
  public getDonationsSentCounter(): number {
    return this.donationsSentCounter;
  }

  /**
   * Method to get the amount of ether donated
   * @returns Amount of ether donated
   */
  public getTotalCoinDonated(): number {
    return this.totalCoinDonated;
  }
}
