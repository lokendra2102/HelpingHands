import { Request, Response } from "express";
import { UserDTO } from "../DTO/UserDTO";
import { AssociationService } from "../Service/AssociationService";
import { Container } from "inversify";
import { ExpenditureDTO } from "../DTO/ExpenditureDTO";

/**
 * Controller for associations
 */
export class AssociationController {

  /**
   * Service for associations
   */
  private associationService: AssociationService;

  /**
   * Constructor for the controller
   * @param container Container for dependency injection
   */
  constructor(container: Container) {
    this.associationService = new AssociationService(container);
  }

  /**
   * Method to get all associations
   * @param req Request information
   * @param res Response information
   */
  async getAssociations(req: Request, res: Response) {
    await this.associationService
      .getAssociations()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to add an expenditure to an association
   * @param req Request information
   * @param res Response information
   */
  async addExpenditure(req: Request, res: Response) {
    var expenditureDTO: ExpenditureDTO = req.body;
    await this.associationService
      .addExpenditureByAssociationID(req.params.id, expenditureDTO)
      .then((expenditureDTORet) => {
        return res.status(200).json(expenditureDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to update an associations's expenditure
   * @param req Request information
   * @param res Response information
   */
  async updateExpenditure(req: Request, res: Response) {
    var expenditureDTO: ExpenditureDTO = req.body;
    await this.associationService
      .updateAssociationExpenditureByID(req.params.id, expenditureDTO)
      .then((expenditureEdited) => {
        res.json(expenditureEdited);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to get an associations's expenditure by the association's and the expenditure's ID
   * @param req Request information
   * @param res Response information
   */
  async getExpenditureByID(req: Request, res: Response) {
    await this.associationService
      .getAssociationExpenditureByID(req.params.userID, req.params.expenditureID)
      .then((expenditureDTORet) => {
        return res.status(200).json(expenditureDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to get an associations's expenditure list by association ID
   * @param req Request information
   * @param res Response information
   */
  async getExpenditureListByAssociationID(req: Request, res: Response) {
    await this.associationService
      .getAssociationExpenditureListByAssociationID(req.params.userID)
      .then((expenditureDTOList) => {
        return res.status(200).json(expenditureDTOList);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to delete an associations's expenditure by the association's and the expenditure's ID
   * @param req Request information
   * @param res Response information
   */
  async deleteExpenditure(req: Request, res: Response) {
    await this.associationService
      .deleteAssociationExpenditure(req.params.userID, req.params.expenditureID)
      .then((answer) => {
        if (answer) {
          res.status(200).json({ message: "Expenditure deleted." });
        } else {
          res.status(400).json({ message: "Expenditure not found." });
        }
      });
  }
}
