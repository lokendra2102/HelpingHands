import { ValueObject } from "./ValueObject";

/**
 * Description of an entity
 */
export class Description extends ValueObject {

  /**
   * String with the description
   */
  private description: string;

  /**
   * Description constructor
   * @param description Description
   */
  constructor(description: string) {
    if (description === null) {
      throw new Error("Invalid Description");
    }
    super();
    this.description = description;
  }
  
  /**
   * Method to get the description
   * @returns Description
   */
  public getDescription(): string {
    return this.description;
  }
}
