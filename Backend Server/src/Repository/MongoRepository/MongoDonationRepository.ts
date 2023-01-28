import donationDB, { IDonationModel } from "../../Model/DonationModel";
import { injectable } from "inversify";

import { IDonationRepository } from "../InterfacesRepository/IDonationRepository";
import { DonationMapper } from "../../Mapper/DonationMapper";
import { Donation } from "../../Domain/Donation/Donation";

@injectable()
export class MongoDonationRepository implements IDonationRepository {

  async findById(id: string): Promise<Donation> {
    const foundDonationPromise: IDonationModel = await donationDB
      .findById(id)
      .catch((err) => {
        throw new Error(err);
      });
    const donationDomainRet: Donation =
      DonationMapper.model2Domain(foundDonationPromise);
    return donationDomainRet;
  }

  async save(newDonation: Donation): Promise<Donation> {
    const donation: IDonationModel = DonationMapper.domain2Model(newDonation);
    await donation.validate();

    const createdDonation: IDonationModel = await donationDB.create(donation);

    const donationRet: Donation = DonationMapper.model2Domain(createdDonation);
    return donationRet;
  }

  async deleteDonation(id: string): Promise<boolean> {
    if ((await donationDB.findByIdAndDelete(id)) === null) {
      return false;
    } else {
      return true;
    }
  }

  async getDonationsByDonatorID(id: string): Promise<Array<Donation>> {
    const donations: Array<IDonationModel> = await donationDB.find({
      donatorId: id,
    });
    return donations.map<Donation>((donationModel) =>
      DonationMapper.model2Domain(donationModel)
    );
  }

  async getDonationsByAssociationID(id: string): Promise<Array<Donation>> {
    const donations: Array<IDonationModel> = await donationDB.find({
      associationId: id,
    });
    return donations.map<Donation>((donationModel) =>
      DonationMapper.model2Domain(donationModel)
    );
  }

  change(changedObject: any) {
    throw new Error("Method not implemented.");
}
}
