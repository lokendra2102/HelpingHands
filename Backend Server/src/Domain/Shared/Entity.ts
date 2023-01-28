/**
 * Entity representation
 */
export abstract class Entity {

  /**
   * Entity ID
   */
  private id: string;

  /**
   * Constructor for an entity
   * @param id ID
   */
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Method to get an entity's ID
   * @returns ID
   */
  public getID(): string {
    return this.id;
  }
}
