import { Container, injectable } from "inversify";
import { TYPES } from "../InversifyConfig/types";
import { DonationDTO } from "../DTO/DonationDTO";
import { Donation } from "../Domain/Donation/Donation";
import { DonationMapper } from "../Mapper/DonationMapper";
import { IDonationRepository } from "../Repository/InterfacesRepository/IDonationRepository";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { Web3Service } from "../Web3/Web3Service";
import { User } from "../Domain/User/User";
import { Donator } from "../Domain/User/Donator";
import { Association } from "../Domain/User/Association";

/**
 * Service for donation
 */
export class DonationService {

  /**
   * Repository for donations
   */
  private donationRepository: IDonationRepository;

  /**
   * Repository for users
   */
  private userRepository: IUserRepository;

  /**
   * Web3 service
   */
  private web3Service: Web3Service;

  /**
   * Constructor for the service
   * @param container Container for dependency injection
   */
  constructor(container: Container) {
    this.donationRepository = container.get<IDonationRepository>(
      TYPES.DonationRepository
    );
    this.userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    this.web3Service = new Web3Service();
  }

  /**
   * Method to donate to an association
   * @param donationDTO Donation being made
   * @returns Donation made
   */
  async donate(donationDTO: DonationDTO): Promise<DonationDTO> {
    // const CryptoAccount = require('send-crypto');
    // const ganache = require("ganache");
    // console.log(ganache.provider());

    // const privateKey : any = "37a418c51544c3a5c216a3c098cf8290ecc98f1dfb7d598d75931fff48dce221";
    // const account : any =   new CryptoAccount(privateKey,{
    //   network : "HTTP://192.168.1.5:4444"
    // });

    // console.log(await account.address("ETH"));

    // await account.getBalanceInSats("ETH")
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(e => {
    //   console.log(e);
    // })

    // await account
    //     .send("0x9EC0e94E0721CD8CcAf817f9f123Fa9416657397", 10, "ETH")
    //     .on("transactionHash", (data) => {
    //       console.log(data + "    t");
    //     })
    //     .on("confirmation", (data) => {
    //       console.log(data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     })

    const { ethers } = require('ethers');
    const donation: Donation = DonationMapper.dto2Domain(donationDTO);
    const url = "HTTP://127.0.0.1:7545";

    const provider:any = new ethers.providers.JsonRpcProvider(url);
    const signer:any = provider.getSigner();
    console.log(signer);
    const block:any = await provider.getBlockNumber();
    console.log(block);

    //checking balance
    const address:string = '0xa291483188634E9Fd6542a830aF24B356F891401'
    provider.getBalance(address).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance)
      console.log(`balance: ${balanceInEth} ETH`)
    })

    //trans history
    let historyProvider = new ethers.providers.EtherscanProvider();
    let history = await historyProvider.getHistory(address);
    console.log(history)

    let privateKey = 'c0080aa46a7a09d5c31c2cce2dd8e1a10fba89148e79deb0e8d680c81a0255c0'
    let wallet = new ethers.Wallet(privateKey, provider)
    let receiverAddress = '0x5C00E3a54A30ba23f7a1e5f6261a105Ffe31B0C7'
    let amountInEther = '134'
    let tx = {
        to: receiverAddress,
        value: ethers.utils.parseEther(amountInEther)
    }
    let bal = await wallet.getBalance();
    bal = ethers.utils.formatEther( bal )
    console.log(wallet, bal);
    
    // Send a transaction
    wallet.sendTransaction(tx)
    .then((txObj:any) => {
        console.log('txHash', txObj.hash)
    })

    let donator: User = await this.userRepository.findById(
      donation.getDonatorID()
    );
    let association: User = await this.userRepository.findById(
      donation.getAssociationId()
    );

    // Send transaction from one user to another in the blockchain and get the hash
    let txHash: string = await this.web3Service.sendTransactionFromUser(
      donator.getPublicAddress(),
      association.getPublicAddress(),
      donator.getPassword().getPassword(),
      donation.getValue().toString()
    );

    // Update the donation information
    donation.setTransactionId(txHash);
    donation.setDate(new Date());
    const donationResponse: Donation = await this.donationRepository.save(
      donation
    );
    await this.userRepository.updateUsersDonations(
      donation.getDonatorID(),
      donation.getAssociationId(),
      donation.getValue()
    );
    const donationResponseDTO: DonationDTO =
      DonationMapper.domain2Dto(donationResponse);
    return donationResponseDTO;
  }

  /**
   * Get donation by ID
   * @param id Donation ID
   * @returns Donation
   */
  async getDonationByID(id: string): Promise<DonationDTO> {
    const donationResponse: Donation = await this.donationRepository.findById(
      id
    );
    const donationResponseDTO: DonationDTO =
      DonationMapper.domain2Dto(donationResponse);
    return donationResponseDTO;
  }

  /**
   * Method to get all donations from a donator
   * @param id Donator ID
   * @returns Donations
   */
  async getDonationsByDonatorID(id: string): Promise<Array<DonationDTO>> {
    const donationsResponse: Array<Donation> =
      await this.donationRepository.getDonationsByDonatorID(id);
    const donationsResponseDTO: Array<DonationDTO> =
      donationsResponse.map<DonationDTO>((donation) =>
        DonationMapper.domain2Dto(donation)
      );
    return donationsResponseDTO;
  }

  /**
   * Method to get all donations to an association
   * @param id Association ID
   * @returns Donations
   */
  async getDonationsByAssociationID(id: string): Promise<Array<DonationDTO>> {
    const donationsResponse: Array<Donation> =
      await this.donationRepository.getDonationsByAssociationID(id);
    const donationsResponseDTO: Array<DonationDTO> =
      donationsResponse.map<DonationDTO>((donation) =>
        DonationMapper.domain2Dto(donation)
      );
    return donationsResponseDTO;
  }

  /**
   * Delete a donation by ID
   * @param id Donation ID
   * @returns True if successful false otherwise
   */
  async deleteDonation(id: string): Promise<boolean> {
    return this.donationRepository.deleteDonation(id);
  }
}
