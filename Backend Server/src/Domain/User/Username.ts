import { ValueObject } from "../Shared/ValueObject";

/**
 * Username
 */
export class Username extends ValueObject {

  /**
   * String for username
   */
  private username: string;

  /**
   * Constructor for username
   * @param username Username
   */
  constructor(username: string) {
    if (username.length <= 0 || username === null) {
      throw new Error("Invalid Username");
    }
    super();
    this.username = username;
  }

  /**
   * Method to get the username
   * @returns Username
   */
  public getUsername(): string {
    return this.username;
  }
}
