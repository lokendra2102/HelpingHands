import { ValueObject } from "../Shared/ValueObject";

/**
 * Regular expression for email
 */
const regex =
  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;

/**
 * Email
 */
export class Email extends ValueObject {

  /**
   * String with email
   */
  private email: string;

  /**
   * Constructor for emai;
   * @param email Email
   */
  constructor(email: string) {
    if (!regex.test(email)) {
      throw new Error("Invalid Email");
    }
    super();
    this.email = email;
  }

  /**
   * Method to get the Email
   * @returns Email
   */
  public getEmail(): string {
    return this.email;
  }
}
