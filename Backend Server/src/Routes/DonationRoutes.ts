import * as express from "express";
import { DonationController } from "../Controllers/DonationController";
import container from "../InversifyConfig/inversify.config";

class DonationRoutes {
  public router: express.Router = express.Router();

  private donationController: DonationController;

  constructor() {
    this.config();
    this.donationController = new DonationController(container);
  }

  private config(): void {

    /**
     * Route to donate
     */
    this.router.post("/", (req: express.Request, res: express.Response) =>
      this.donationController.donate(req, res)
    );

    /**
     * Route to get a donation by ID
     */
    this.router.get("/:donationID", (req: express.Request, res: express.Response) =>
      this.donationController.getDonationByID(req, res)
    );

    /**
     * Route to get donations by donator ID
     */
    this.router.get("/donator/:userID", (req: express.Request, res: express.Response) =>
      this.donationController.getDonationsByDonorID(req, res)
    );

    /**
     * Route to get donations by associations ID
     */
    this.router.get("/association/:userID", (req: express.Request, res: express.Response) =>
      this.donationController.getDonationsByAssociationID(req, res)
    );

    /**
     * Route to delete a donation
     */
    this.router.delete("/:donationID", (req: express.Request, res: express.Response) =>
      this.donationController.deleteDonation(req, res)
    );

  }
}

export const donationRoutes = new DonationRoutes().router;
