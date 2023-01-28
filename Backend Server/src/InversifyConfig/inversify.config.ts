import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { UserService } from "../Service/UserService";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { MongoUserRepository } from "../Repository/MongoRepository/MongoUserRepository";
import { MongoDonationRepository } from "../Repository/MongoRepository/MongoDonationRepository";
import { IDonationRepository } from "../Repository/InterfacesRepository/IDonationRepository";

let container = new Container();

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.UserRepository).to(MongoUserRepository);
container.bind<IDonationRepository>(TYPES.DonationRepository).to(MongoDonationRepository);

export default container;
