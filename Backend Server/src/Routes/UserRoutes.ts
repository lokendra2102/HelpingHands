import * as express from "express";
import { UserController } from "../Controllers/UserController";
import container from "../InversifyConfig/inversify.config";

class UserRoutes {
  public router: express.Router = express.Router();

  private userController: UserController;

  constructor() {
    this.config();
    this.userController = new UserController(container);
  }

  private config(): void {

    /**
     * Route to create a user
     */
    this.router.post("/", (req: express.Request, res: express.Response) => this.userController.postUser(req, res));

    /**
     * Route to update a user
     */
    this.router.put("/", (req: express.Request, res: express.Response) => this.userController.putUser(req, res));

    /**
     * Route to get a user by ID
     */
    this.router.get("/:id", (req: express.Request, res: express.Response) => this.userController.getUserByID(req, res));

    /**
     * Route to get a user by email
     */
    this.router.post("/login/", (req: express.Request, res: express.Response) =>
      this.userController.login(req, res)
    );

    /**
     * Route to delete a user
     */
    this.router.delete("/:id", (req: express.Request, res: express.Response) =>
      this.userController.deleteUser(req, res)
    );

    /**
     * Route to add funds to a user
     */
    this.router.post("/:id/addFunds", (req: express.Request, res: express.Response) => this.userController.addFunds(req, res));

    /**
     * Route to withdraw funds from a user
     */
    this.router.post("/:id/withdrawFunds", (req: express.Request, res: express.Response) => this.userController.withdrawFunds(req, res));
  }
}

export const userRoutes = new UserRoutes().router;
