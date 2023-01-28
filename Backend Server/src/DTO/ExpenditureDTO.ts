export class ExpenditureDTO {
  public id: string;
  public value: number;
  public justification: string;
  public date: string;
  public transactionId: string;

  constructor(id: string, value: number, justification: string, date: string, transactionId: string) {
    this.id = id;
    this.value = value;
    this.justification = justification;
    this.date = date;
    this.transactionId = transactionId;
  }
}
