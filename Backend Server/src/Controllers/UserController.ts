import { Request, Response } from "express";
import { UserDTO } from "../DTO/UserDTO";
import { UserService } from "../Service/UserService";
import { Container } from "inversify";
import { visitFunctionBody } from "typescript";

/**
 * Controller for user
 */
export class UserController {

  /**
   * Service for the user
   */
  private userService: UserService;

  /**
   * Constructor for user
   * @param container Container for dependency injection
   */
  constructor(container: Container) {
    this.userService = new UserService(container);
  }

  /**
   * Method to create a user (donator and association)
   * @param req Request information
   * @param res Response information
   */
  public postUser(req: Request, res: Response) {
    const userDTO: UserDTO = req.body;
    this.userService
      .createUser(userDTO)
      .then((userDTOReturned) => {
        return res.status(201).json(userDTOReturned);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }

  /**
   * Method to update a user (donator and association)
   * @param req Request information
   * @param res Response information
   */
  async putUser(req: Request, res: Response) {
    var userDTO: UserDTO = req.body;
    await this.userService
      .editUser(userDTO)
      .then((userEdited) => {
        res.json(userEdited);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to get a user by ID
   * @param req Request information
   * @param res Response information
   */
  async getUserByID(req: Request, res: Response) {
    await this.userService
      .getUserById(req.params.id)
      .then((userDTORet) => {
        return res.status(200).json(userDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to get a user by email
   * @param req Request information
   * @param res Response information
   */
  async getUserByEmail(req: Request, res: Response) {
    await this.userService
      .getUserByEmail(req.body.email)
      .then((userDTORet) => {
        return res.status(200).json(userDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to delete a user by ID
   * @param req Request information
   * @param res Response information
   */
  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id).then((answer) => {
      if (answer === true) {
        res.status(200).json({ message: "User deleted." });
      } else {
        res.status(400).json({ message: "User not found." });
      }
    });
  }

  /**
   * Method to add funds to a user by ID
   * @param req Request information
   * @param res Response information
   */
  async addFunds(req: Request, res: Response) {
    await this.userService
      .addFunds(req.params.id, req.body.amount)
      .then((answer) => {
        if (answer === true) {
          res.status(200).json({ message: "Added " + req.body.amount + " ether to your account." });
        } else {
          res.status(400).json({ message: "Could not add funds." });
        }
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  /**
   * Method to withdraw fund from a user by ID
   * @param req Request information
   * @param res Response information
   */
  async withdrawFunds(req: Request, res: Response) {
    await this.userService
      .withdrawFunds(req.params.id, req.body.amount)
      .then((answer) => {
        if (answer === true) {
          res.status(200).json({ message: "Withdrew " + req.body.amount + " from your account." });
        } else {
          res.status(400).json({ message: "Could not add funds." });
        }
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async login(req: Request, res: Response) {
    await this.userService
      .login(req.body.email, req.body.password)
      .then((userDTORet) => {
        return res.status(200).json(userDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }
}
