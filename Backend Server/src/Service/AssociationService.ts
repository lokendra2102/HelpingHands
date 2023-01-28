import { UserDTO } from "../DTO/UserDTO";
import { User } from "../Domain/User/User";
import { UserMapper } from "../Mapper/UserMapper";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { Container, injectable } from "inversify";
import { TYPES } from "../InversifyConfig/types";
import { ExpenditureDTO } from "../DTO/ExpenditureDTO";
import { Expenditure } from "../Domain/User/Expenditure";
import { ExpenditureMapper } from "../Mapper/ExpenditureMapper";
import { Association } from "../Domain/User/Association";
import { Web3Service } from "../Web3/Web3Service";

/**
 * Service for association
 */
export class AssociationService {

  /**
   * Repository for users
   */
  private userRepository: IUserRepository;

  /**
   * Web3 service
   */
  private web3Service: Web3Service;

  /**
   * Constructor for the service
   * @param container Container for Dependency Injection
   */
  constructor(container: Container) {
    this.userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    this.web3Service = new Web3Service();
  }

  /**
   * Method to get all associations
   * @returns All associations
   */
  async getAssociations(): Promise<Array<UserDTO>> {
    const associations: Array<User> = await this.userRepository.getAssociations();
    return associations.map<UserDTO>((association) => UserMapper.domain2Dto(association));
  }

  /**
   * Method to add an expenditure to an association
   * @param id Association ID
   * @param expenditureDTO Expenditure
   * @returns The expenditure added
   */
  async addExpenditureByAssociationID(id: string, expenditureDTO: ExpenditureDTO): Promise<ExpenditureDTO> {
    const expenditure: Expenditure = ExpenditureMapper.dto2Domain(expenditureDTO);
    const association: User = await this.userRepository.findById(id);

    // Send transaction from the user to the platform account
    const hash: string = await this.web3Service.sendTransactionFromUserToAdmin(association.getPublicAddress(), association.getPassword().getPassword(), expenditure.getValue().toString());
    expenditure.setTransactionId(hash);
    const expenditureResponse: Expenditure = await this.userRepository.addExpenditureToUser(id, expenditure);
    const expenditureResponseDTO: ExpenditureDTO = ExpenditureMapper.domain2Dto(expenditureResponse);
    return expenditureResponseDTO;
  }

  /**
   * Method to update an expenditure
   * @param id Association ID
   * @param expenditureDTO Expenditure
   * @returns Updated expenditure
   */
  async updateAssociationExpenditureByID(id: string, expenditureDTO: ExpenditureDTO): Promise<ExpenditureDTO> {
    const expenditure: Expenditure = ExpenditureMapper.dto2Domain(expenditureDTO);
    const expenditureResponse: Expenditure = await this.userRepository.updateUserExpenditure(id, expenditure);
    const expenditureResponseDTO: ExpenditureDTO = ExpenditureMapper.domain2Dto(expenditureResponse);
    return expenditureResponseDTO;
  }

  /**
   * Method to find an expenditure
   * @param userID Association ID
   * @param expenditureID Expenditure ID
   * @returns Found expenditure
   */
  async getAssociationExpenditureByID(userID: string, expenditureID: string): Promise<ExpenditureDTO> {
    const expenditureResponseDomain: Expenditure = await this.userRepository.findUserExpenditureById(
      userID,
      expenditureID
    );
    const expenditureResponseDTO: ExpenditureDTO = ExpenditureMapper.domain2Dto(expenditureResponseDomain);
    return expenditureResponseDTO;
  }

  /**
   * Method to get an association's expenditure list
   * @param userID Association ID
   * @returns Association list
   */
  async getAssociationExpenditureListByAssociationID(userID: string): Promise<Array<ExpenditureDTO>> {
    const association: Association = await this.userRepository.findById(
      userID,
    );
    return association.getExpenditureList().map<ExpenditureDTO>((expenditure) => ExpenditureMapper.domain2Dto(expenditure));
  }

  /**
   * Method to delete an expenditure
   * @param userID Association ID
   * @param expenditureID Expenditure ID
   * @returns 
   */
  async deleteAssociationExpenditure(userID: string, expenditureID: string): Promise<boolean> {
    return await this.userRepository.deleteUserExpenditure(userID, expenditureID);
  }
}
