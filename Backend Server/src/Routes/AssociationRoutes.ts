import * as express from "express";
import { AssociationController } from "../Controllers/AssociationController";
import container from "../InversifyConfig/inversify.config";

class AssociationRoutes {
  public router: express.Router = express.Router();

  private associationController: AssociationController;

  constructor() {
    this.config();
    this.associationController = new AssociationController(container);
  }

  private config(): void {

    /**
     * Route to add an expenditure
     */
    this.router.post("/:id/expenditure", (req: express.Request, res: express.Response) =>
      this.associationController.addExpenditure(req, res)
    );

    /**
     * Route to get all associations
     */
    this.router.get("/associations/list", (req: express.Request, res: express.Response) => this.associationController.getAssociations(req, res));

    /**
     * Route to update an expenditure
     */
    this.router.put("/:id/expenditure", (req: express.Request, res: express.Response) =>
      this.associationController.updateExpenditure(req, res)
    );

    /**
     * Route to get an Expenditure by ID
     */
    this.router.get("/:userID/expenditure/:expenditureID", (req: express.Request, res: express.Response) =>
      this.associationController.getExpenditureByID(req, res)
    );

    /**
     * Route to get an association's expenditure list
     */
    this.router.get("/:userID/expenditureList", (req: express.Request, res: express.Response) =>
      this.associationController.getExpenditureListByAssociationID(req, res)
    );

    /**
     * Route to delete an expenditure
     */
    this.router.delete("/:userID/expenditure/:expenditureID", (req: express.Request, res: express.Response) =>
      this.associationController.deleteExpenditure(req, res)
    );
  }
}

export const associationRoutes = new AssociationRoutes().router;
