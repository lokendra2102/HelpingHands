export class DonationDTO {
  public id: string;
  public value: number;
  public description: string;
  public date: string;
  public transactionId: string;
  public donatorId: string;
  public associationId: string;

  constructor(
    id: string,
    value: number,
    description: string,
    date: string,
    transactionId: string,
    donatorId: string,
    associationId: string
  ) {
    this.id = id;
    this.value = value;
    this.description = description;
    this.date = date;
    this.transactionId = transactionId;
    this.donatorId = donatorId;
    this.associationId = associationId;
  }
}
