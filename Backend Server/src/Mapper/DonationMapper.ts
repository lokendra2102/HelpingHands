import { Donation } from "../Domain/Donation/Donation";
import { DonationDTO } from "../DTO/DonationDTO";
import DonationModel, { IDonationModel } from "../Model/DonationModel";

/**
 * Mapper for Donation
 */
export class DonationMapper {

  /**
   * Method to map from json to a DonationDTO
   * @param body Json body
   * @returns 
   */
  static json2Dto(body: any): DonationDTO {
    return new DonationDTO(
      body.id,
      body.value,
      body.description,
      body.date,
      body.transactionId,
      body.donatorId,
      body.associationId
    );
  }

  /**
   * Method to map from DonationDTO to a Donation
   * @param donationDTO Donation DTO
   * @returns Donation Domain object
   */
  static dto2Domain(donationDTO: DonationDTO): Donation {
    let donation = new Donation(
      donationDTO.id,
      donationDTO.value,
      donationDTO.description,
      new Date(donationDTO.date),
      donationDTO.transactionId,
      donationDTO.donatorId,
      donationDTO.associationId
    );
    return donation;
  }

  /**
   * Method to map from a Donation Domain to a Donation DB Model
   * @param donation Donation domain object
   * @returns Donation DB Model
   */
  static domain2Model(donation: Donation): IDonationModel {
    let donationModel = new DonationModel({
      id: donation.getID(),
      value: donation.getValue(),
      description: donation.getDescription(),
      date: donation.getDate().toDateString(),
      transactionId: donation.getTransactionId(),
      donatorId: donation.getDonatorID(),
      associationId: donation.getAssociationId(),
    });
    return donationModel;
  }

  /**
   * Method to map from Donation DB Model to a Donation Domain
   * @param donationModel Donation DB Model
   * @returns Donation Domain object
   */
  static model2Domain(donationModel: IDonationModel): Donation {
    let donation = new Donation(
      donationModel._id.valueOf(),
      donationModel.value,
      donationModel.description,
      new Date(donationModel.date),
      donationModel.transactionId,
      donationModel.donatorId,
      donationModel.associationId
    );
    return donation;
  }

  /**
   * Method to map from a Donation Domain to a DonationDTO
   * @param donation Donation Domain object
   * @returns DonationDTO object
   */
  static domain2Dto(donation: Donation): DonationDTO {
    let donationDTO = new DonationDTO(
      donation.getID(),
      donation.getValue(),
      donation.getDescription(),
      donation.getDate().toDateString(),
      donation.getTransactionId(),
      donation.getDonatorID(),
      donation.getAssociationId()
    );
    return donationDTO;
  }
}
