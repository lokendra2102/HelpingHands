//TEST SCRIPT FOR ETHEREUM TRANSACTIONS
export class Web3Service {

  private web3;

  /**
   * Platform account public address
   */
  private platformPublicAddress;

  /**
   * Platform account private key to sign transactions
   */
  private platformPrivateKey;

  /**
   * Gas being used not price
   */
  private gasPrice;

  constructor() {
    const Web3 = require("web3");
    const config = require("config");
    this.platformPublicAddress = config.get("platformPublicAddress");
    this.platformPrivateKey = config.get("platformPrivateKey");
    this.gasPrice = config.get("gasPrice"); 
    const network = config.get("web3NetworkID");
    this.web3 = new Web3(network);
  }

  /**
   * Method to send a transaction from the platform to a user
   * @param toAddress Destination address
   * @param value amount of ether being transferred
   * @returns 
   */
  async sendTransactionFromAdmin(toAddress: string, value: string): Promise<boolean>{

  // Create nonce
    const nonce = await this.web3.eth.getTransactionCount(
      this.platformPublicAddress,
      "latest"
    ); // nonce starts counting from 0

    // Create transaction
    const transaction = {
      to: toAddress,
      value: this.web3.utils.toWei(value, "ether"),
      gas: this.gasPrice,
      nonce: nonce,
      //'data': field to execute smart contract
    };

    // Sign the transaction
    const signedTx = await this.web3.eth.accounts.signTransaction(
      transaction,
      this.platformPrivateKey
    );

    let result;

    // Send transaction
    await this.web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (error, hash) {
        if (!error) {
          result = true;
        } else {
          result = false;
        }
      }
    );
    return result;
  }

  /**
   * 
   * @param from From address
   * @param to To address
   * @param password From user password to unlock(sign) the account
   * @param value ether being transferred
   * @returns Transaction hash
   */
  async sendTransactionFromUser(from: string, to: string, password: string, value: string): Promise<string> {

    // Create hash
    const nonce = await this.web3.eth.getTransactionCount(from, "latest"); // nonce starts counting from 0

    // Unlock the account to sign the transactions sent
    await this.web3.eth.personal.unlockAccount(from, password);

    // Create transaction
    const transaction = {
      from: from,
      to: to,
      value: this.web3.utils.toWei(value, "ether"),
      gas: this.gasPrice,
      nonce: nonce,
      //'data': field to execute smart contract
    };
    var transactionHash;
    var txError;

    // Send the transaction 
    await this.web3.eth.sendTransaction(transaction, function (error, hash) {
      if (!error) {
        // Get the transaction hash
        transactionHash = hash;
      } else {
        txError = error;
      }
    });

    // Lock the account again
    await this.web3.eth.personal.lockAccount(from);
    if (txError){
      throw new txError;
    }
    return transactionHash;
  };

  /**
   * Method to send ether from a user to the platform account
   * @param from From account
   * @param password From user password
   * @param value amount of ether
   * @returns Transaction hash
   */
  async sendTransactionFromUserToAdmin(from: string, password: string, value: string): Promise<string> {
    return await this.sendTransactionFromUser(from, this.platformPublicAddress, password, value);
  };

  /**
   * Get all transactions by a user in a given period
   * @param days Number of days in past
   * @param from From account
   * @returns Transactions
   */
  async checkLastTransactionsFromAccount(days: number, from: string): Promise<Array<any>> {
    let block = await this.web3.eth.getBlock("latest");
    let numberOfDays = days;
    let currentDate = Math.round(new Date().getTime() / 1000);
    let pastTimeStamp = currentDate - numberOfDays * 24 * 60 * 60;
    let transactions: Array<any>;

    // Iterate blocks while there are blocks and the date is in the given period
    while (
      block != null &&
      block.transactions != null &&
      block.timestamp > pastTimeStamp
    ) {
      let number = block.number;
      
      // Iterate transactions in the block
      for (let txHash of block.transactions) {
        let tx = await this.web3.eth.getTransaction(txHash);
        if (from == tx.from) {
          transactions.push({
            from: tx.from,
            to: tx.to,
            value: this.web3.utils.fromWei(tx.value, "ether"),
            timestamp: new Date(),
          });
        }
      }
      block = await this.web3.eth.getBlock(number - 1);
      if (number == block.number) {
        break;
      }
    }
    return transactions;
  };

  /**
   * Method to create an account in the blockchain
   * @param password User password used to generate a key
   * @returns Created account public address
   */
  async createAccount(password: string): Promise<string> {
    const account = await this.web3.eth.personal.newAccount(password);
    return account;
  };

  /**
   * Method to get all account in the blockchain
   */
  async checkAccounts() {
    var accounts = await this.web3.eth.getAccounts();
    console.log(accounts);
  };
  //sendTransaction();
  //checkLastTransactions();
  //createAccount();
  //checkAccounts();
}
