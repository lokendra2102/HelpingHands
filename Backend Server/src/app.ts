import express from "express";

import * as bodyParser from "body-parser";
import { userRoutes } from "./Routes/UserRoutes";
import { associationRoutes } from "./Routes/AssociationRoutes";
import { donationRoutes } from "./Routes/DonationRoutes";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.set("port", 8080);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    });
    this.app.use("/users", [userRoutes, associationRoutes]);
    this.app.use("/donation", donationRoutes);
    this.app.disable("etag");
  }

  start() {
    this.app.listen(process.env.PORT || 8080, () => {
      console.log("Server running in port " + this.app.get("port"));
    });
  }
}
