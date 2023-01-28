export interface IRepository {

  /**
   * Save an object in the DB
   * @param objectToSave Object being saved
   */
  save(objectToSave: any): any;

  /**
   * Find object by ID
   * @param id Object ID
   */
  findById(id: string): any;

  /**
   * Update an object
   * @param changedObject Object to update
   */
  change(changedObject: any): any;
}
