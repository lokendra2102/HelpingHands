export class DonatorDTO {
  public id: string;
  public name: string;
  public username: string;
  public password: string;
  public email: string;
  public country: string;
  public donationsSentCounter: number;
  public totalCoinDonated: number;

  constructor(
    id: string,
    name: string,
    username: string,
    password: string,
    email: string,
    country: string,
    donationsSentCounter: number,
    totalCoinDonated: number
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.country = country;
    this.donationsSentCounter = donationsSentCounter;
    this.totalCoinDonated = totalCoinDonated;
  }
}
