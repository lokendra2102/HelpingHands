import { Donation } from "../../Domain/Donation/Donation";
import { IRepository } from "./IRepository";

export interface IDonationRepository extends IRepository {

    /**
     * Get a donator's donations by donator ID
     * @param id Donator ID
     */
    getDonationsByDonatorID(id: string): Promise<Array<Donation>>;

    /**
     * Get a association's donations by association ID
     * @param id Association ID
     */
    getDonationsByAssociationID(id: string): Promise<Array<Donation>>;

    /**
     * Delete donation by ID
     * @param id Donation ID
     */
    deleteDonation(id: string): Promise<boolean>;

}
