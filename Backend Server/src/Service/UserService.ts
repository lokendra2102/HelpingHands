import { UserDTO } from "../DTO/UserDTO";
import { User } from "../Domain/User/User";
import { UserMapper } from "../Mapper/UserMapper";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { Container } from "inversify";
import { TYPES } from "../InversifyConfig/types";
import { Web3Service } from "../Web3/Web3Service";

/**
 * Service for users
 */
export class UserService {

  /**
   * Repository for users
   */
  private userRepository: IUserRepository;

  /**
   * Web3 Service
   */
  private web3Service: Web3Service;

  /**
   * Constructor for the service
   * @param container Container for dependency injection
   */
  constructor(container: Container) {
    this.userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    this.web3Service = new Web3Service();
  }

  /**
   * Method to create a user
   * @param userDTO User 
   * @returns Created user
   */
  async createUser(userDTO: UserDTO): Promise<UserDTO> {
    const userDomain: User = UserMapper.dto2Domain(userDTO);

    // Create the user account in the blockchain using his password and get his public address
    let publicAddress: string = await this.web3Service.createAccount(userDomain.getPassword().getPassword());
    userDomain.setPublicAddress(publicAddress);
    const userDomainResponse: User = await this.userRepository.save(userDomain);
    const userResponseDTO: UserDTO = UserMapper.domain2Dto(userDomainResponse);
    return userResponseDTO;
  }

  /**
   * Method to get a user by ID
   * @param id User ID
   * @returns Found user
   */
  async getUserById(id: string): Promise<UserDTO> {
    const userResponseDomain: User = await this.userRepository.findById(id);
    const userResponseDTO: UserDTO = UserMapper.domain2Dto(userResponseDomain);
    return userResponseDTO;
  }

  /**
   * Method to get a user by email
   * @param email User email
   * @returns Found user
   */
  async getUserByEmail(email: string): Promise<UserDTO> {
    const userResponseDomain: User = await this.userRepository.findByEmail(email);
    const userResponseDTO: UserDTO = UserMapper.domain2Dto(userResponseDomain);
    return userResponseDTO;
  }

  /**
   *  Method to update a user
   * @param userDTO user to update
   * @returns Updated user
   */
  async editUser(userDTO: UserDTO): Promise<UserDTO> {
    var userRequestDomain: User = UserMapper.dto2Domain(userDTO);
    const userDomain: User = await this.userRepository.change(userRequestDomain);
    var userResponseDomain: UserDTO = UserMapper.domain2Dto(userDomain);

    return userResponseDomain;
  }

  /**
   * Method that calls the repository to delete an user
   * @param id user's id
   */
  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.deleteUser(id);
  }

  /**
   * Method to add funds to a user
   * @param id User ID
   * @param amount ether amount
   * @returns True if successful false otherwise
   */
  async addFunds(id: string, amount: number): Promise<boolean> {
    let user: User = await this.userRepository.findById(id);

    // Make transaction from platform account to user
    await this.web3Service.sendTransactionFromAdmin(user.getPublicAddress(), amount.toString());
    return await this.userRepository.addFunds(user, amount);
  }

  /**
   * Method to withdraw funds from a user
   * @param id User ID
   * @param amount ether amount
   * @returns True if successful false otherwise
   */
  async withdrawFunds(id: string, amount: number): Promise<boolean> {
    let user: User = await this.userRepository.findById(id);

    // Make transaction from user to platform account
    await this.web3Service.sendTransactionFromUserToAdmin(user.getPublicAddress(), user.getPassword().getPassword(), amount.toString());
    return await this.userRepository.withdrawFunds(user, amount);
  }

  /**
   * Method to log a user in
   * @param email Email
   * @param password Password
   * @returns The logged user
   */
  async login(email: string, password: string): Promise<UserDTO> {
    const userResponseDomain: User = await this.userRepository.findByEmail(email);
    if (userResponseDomain.getPassword().getPassword() === password) {
      const userResponseDTO: UserDTO = UserMapper.domain2Dto(userResponseDomain);
      return userResponseDTO;
    }

    throw new Error("Login Failed");
  }
}
