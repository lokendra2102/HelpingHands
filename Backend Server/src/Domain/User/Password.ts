import { ValueObject } from "../Shared/ValueObject";

/**
 * Password
 */
export class Password extends ValueObject {

  /**
   * String with the password
   */
  private password: string;

  /**
   * Constructor for Password
   * @param password Password
   */
  constructor(password: string) {
    super();
    if (password.length < 8 || password === null) {
      throw new Error("Invalid Password");
    }
    this.password = password;
  }

  /**
   * Method to get the password
   * @returns Password
   */
  public getPassword(): string {
    return this.password;
  }
}
