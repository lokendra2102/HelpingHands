import { ExpenditureDTO } from "./ExpenditureDTO";

export class AssociationDTO {
  public id: string;
  public name: string;
  public username: string;
  public password: string;
  public email: string;
  public description: string;
  public donationsReceivedCounter: number;
  public totalCoinReceived: number;
  public expenditureList: Array<ExpenditureDTO>;

  constructor(
    id: string,
    name: string,
    username: string,
    password: string,
    email: string,
    description: string,
    donationsReceivedCounter: number,
    totalCoinReceived: number,
    expenditureList: Array<ExpenditureDTO>
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.description = description;
    this.donationsReceivedCounter = donationsReceivedCounter;
    this.totalCoinReceived = totalCoinReceived;
    this.expenditureList = expenditureList;
  }
}
