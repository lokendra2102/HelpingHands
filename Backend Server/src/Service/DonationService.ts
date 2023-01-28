import { Container, injectable } from "inversify";
import { TYPES } from "../InversifyConfig/types";
import { DonationDTO } from "../DTO/DonationDTO";
import { Donation } from "../Domain/Donation/Donation";
import { DonationMapper } from "../Mapper/DonationMapper";
import { IDonationRepository } from "../Repository/InterfacesRepository/IDonationRepository";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { Web3Service } from "../Web3/Web3Service";
import { User } from "../Domain/User/User";
import { Donator } from "../Domain/User/Donator";
import { Association } from "../Domain/User/Association";

/**
 * Service for donation
 */
export class DonationService {

  /**
   * Repository for donations
   */
  private donationRepository: IDonationRepository;

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
   * @param container Container for dependency injection
   */
  constructor(container: Container) {
    this.donationRepository = container.get<IDonationRepository>(
      TYPES.DonationRepository
    );
    this.userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    this.web3Service = new Web3Service();
  }

  /**
   * Method to donate to an association
   * @param donationDTO Donation being made
   * @returns Donation made
   */
  async donate(donationDTO: DonationDTO): Promise<DonationDTO> {
    const donation: Donation = DonationMapper.dto2Domain(donationDTO);
    let donator: User = await this.userRepository.findById(
      donation.getDonatorID()
    );
    let association: User = await this.userRepository.findById(
      donation.getAssociationId()
    );

    // Send transaction from one user to another in the blockchain and get the hash
    let txHash: string = await this.web3Service.sendTransactionFromUser(
      donator.getPublicAddress(),
      association.getPublicAddress(),
      donator.getPassword().getPassword(),
      donation.getValue().toString()
    );

    // Update the donation information
    donation.setTransactionId(txHash);
    donation.setDate(new Date());
    const donationResponse: Donation = await this.donationRepository.save(
      donation
    );
    await this.userRepository.updateUsersDonations(
      donation.getDonatorID(),
      donation.getAssociationId(),
      donation.getValue()
    );
    const donationResponseDTO: DonationDTO =
      DonationMapper.domain2Dto(donationResponse);
    return donationResponseDTO;
  }

  /**
   * Get donation by ID
   * @param id Donation ID
   * @returns Donation
   */
  async getDonationByID(id: string): Promise<DonationDTO> {
    const donationResponse: Donation = await this.donationRepository.findById(
      id
    );
    const donationResponseDTO: DonationDTO =
      DonationMapper.domain2Dto(donationResponse);
    return donationResponseDTO;
  }

  /**
   * Method to get all donations from a donator
   * @param id Donator ID
   * @returns Donations
   */
  async getDonationsByDonatorID(id: string): Promise<Array<DonationDTO>> {
    const donationsResponse: Array<Donation> =
      await this.donationRepository.getDonationsByDonatorID(id);
    const donationsResponseDTO: Array<DonationDTO> =
      donationsResponse.map<DonationDTO>((donation) =>
        DonationMapper.domain2Dto(donation)
      );
    return donationsResponseDTO;
  }

  /**
   * Method to get all donations to an association
   * @param id Association ID
   * @returns Donations
   */
  async getDonationsByAssociationID(id: string): Promise<Array<DonationDTO>> {
    const donationsResponse: Array<Donation> =
      await this.donationRepository.getDonationsByAssociationID(id);
    const donationsResponseDTO: Array<DonationDTO> =
      donationsResponse.map<DonationDTO>((donation) =>
        DonationMapper.domain2Dto(donation)
      );
    return donationsResponseDTO;
  }

  /**
   * Delete a donation by ID
   * @param id Donation ID
   * @returns True if successful false otherwise
   */
  async deleteDonation(id: string): Promise<boolean> {
    return this.donationRepository.deleteDonation(id);
  }
}
