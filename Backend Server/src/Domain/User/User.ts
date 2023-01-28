import { Password } from "./Password";
import { AggregateRoot } from "../Shared/AggregateRoot";
import { Email } from "./Email";
import { Name } from "../Shared/Name";

/**
 * User
 */
export class User extends AggregateRoot {

  /**
   * Password
   */
  private password: Password;

  /**
   * Email
   */
  private email: Email;

  /**
   * Name
   */
  private name: Name;

  /**
   * Role (donator or association)
   */
  private role: string;

  /**
   * Public address in the blockchain
   */
  private publicAddress: string;

  /**
   * Current ether in account
   */
  private currentEther: number;

  /**
   * Constructor for User
   * @param id ID
   * @param name Name
   * @param password Password
   * @param email Email
   * @param role Role
   * @param publicAddress Public address
   * @param currentEther Current ether
   */
  constructor(id: string, name: Name, password: Password, email: Email, role: string, publicAddress, currentEther: number) {
    super(id);
    this.name = name;
    this.password = password;
    this.email = email;
    this.role = role;
    this.publicAddress = publicAddress;
    this.currentEther = currentEther;
  }

  /**
   * Method to get the ID
   * @returns ID
   */
  public getID(): string {
    return super.getID();
  }

  /**
   * Method to get the name
   * @returns Name
   */
  public getName(): Name {
    return this.name;
  }

  /**
   * Method to get the password
   * @returns Password
   */
  public getPassword(): Password {
    return this.password;
  }

  /**
   * Method to get the ID
   * @returns Email
   */
  public getEmail(): Email {
    return this.email;
  }

  /**
   * Method to get the role
   * @returns Role
   */
  public getRole(): string {
    return this.role;
  }

  /**
   * Method to get the public address
   * @returns Public address
   */
  public getPublicAddress(): string {
    return this.publicAddress;
  }

  /**
   * Method to get the current ether
   * @returns Current ether
   */
  public getCurrentEther(): number {
    return this.currentEther;
  }

  /**
   * Method to set the public address
   * @param publicAddress Public address
   */
  public setPublicAddress(publicAddress: string): void {
    this.publicAddress = publicAddress;
  }
}
