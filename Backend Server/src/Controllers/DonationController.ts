import { Request, Response } from "express";
import { UserDTO } from "../DTO/UserDTO";
import { AssociationService } from "../Service/AssociationService";
import { Container } from "inversify";
import { DonationDTO } from "../DTO/DonationDTO";
import { DonationService } from "../Service/DonationService";

/**
 * Controller for donation
 */
export class DonationController {

  /**
   * Service for donation
   */
  private donationService: DonationService;

  /**
   * Constructor for controller
   * @param container Container for dependency injection
   */
  constructor(container: Container) {
    this.donationService = new DonationService(container);
  }

  /**
   * Method to donate to an association
   * @param req Request information
   * @param res Response information
   */
  async donate(req: Request, res: Response) {
    var donationDTO: DonationDTO = req.body;
    await this.donationService
      .donate(donationDTO)
      .then((donationDTORet) => {
        return res.status(200).json(donationDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to get a donation by its ID
   * @param req Request information
   * @param res Response information
   */
  async getDonationByID(req: Request, res: Response) {
    await this.donationService
      .getDonationByID(req.params.donationID)
      .then((donationDTORet) => {
        return res.status(200).json(donationDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to get a donator's donations by donator ID
   * @param req Request information
   * @param res Response information
   */
  async getDonationsByDonorID(req: Request, res: Response) {
    await this.donationService
      .getDonationsByDonatorID(req.params.userID)
      .then((donations) => {
        return res.status(200).json(donations);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to get a association's donations by association ID
   * @param req Request information
   * @param res Response information
   */
  async getDonationsByAssociationID(req: Request, res: Response) {
    await this.donationService
      .getDonationsByAssociationID(req.params.userID)
      .then((donations) => {
        return res.status(200).json(donations);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to delete a donation by ID
   * @param req Request information
   * @param res Response information
   */
  async deleteDonation(req: Request, res: Response) {
    await this.donationService
      .deleteDonation(req.params.donationID)
      .then((answer) => {
        if (answer) {
          res.status(200).json({ message: "Donation deleted." });
        } else {
          res.status(400).json({ message: "Donation not found." });
        }
      });
  }
}
