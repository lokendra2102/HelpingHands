import { Expenditure } from "../../Domain/User/Expenditure";
import { User } from "../../Domain/User/User";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository {

  /**
   * Get all associations
   */
  getAssociations(): Promise<Array<User>>;

  /**
   * Find user by email
   * @param email User email
   */
  findByEmail(email: string): Promise<User>;

  /**
   * Delete user by ID
   * @param id User ID
   */
  deleteUser(id: string): Promise<boolean>;

  /**
   * Add expenditure to association
   * @param id Association ID
   * @param expenditure Expenditure to add 
   */
  addExpenditureToUser(id: String, expenditure: Expenditure): Promise<Expenditure>;

  /**
   * Update association's expenditure
   * @param id Association ID
   * @param expenditure Expenditure to update
   */
  updateUserExpenditure(id: String, expenditure: Expenditure): Promise<Expenditure>;

  /**
   * Find expenditure by association and expenditure ID
   * @param userID Association ID
   * @param expenditureID Expenditure ID
   */
  findUserExpenditureById(userID: string, expenditureID: string): Promise<Expenditure>;

  /**
   * Delete Expenditure from association
   * @param userID Association ID
   * @param expenditureID Expenditure ID
   */
  deleteUserExpenditure(userID: string, expenditureID: string): Promise<boolean>;

  /**
   * Update the relevant fields in the users involved in a donation
   * @param donatorID Donator ID
   * @param associationID Association ID
   * @param value Donation amount
   */
  updateUsersDonations(donatorID: string, associationID: string, value: number): Promise<boolean>;

  /**
   * Add ether to user
   * @param user User to add funds to
   * @param amount amount of ether being added
   */
  addFunds(user: User, amount: number): Promise<boolean>

  /**
   * Remove ether from user
   * @param user User getting ether removed
   * @param amount Amount of ether
   */
  withdrawFunds(user: User, amount: number): Promise<boolean>
}
