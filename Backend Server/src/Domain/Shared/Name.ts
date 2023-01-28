import { ValueObject } from "./ValueObject";

/**
 * Name of an entity
 */
export class Name extends ValueObject {

  /**
   * String with the name
   */
  private name: string;

  /**
   * Constructor for Name
   * @param name Name
   */
  constructor(name: string) {
    if (name.length <= 0 || name === null) {
      throw new Error("Invalid Name");
    }
    super();
    this.name = name;
  }

  /**
   * Method to get the name
   * @returns Name
   */
  public getName(): string {
    return this.name;
  }
}
