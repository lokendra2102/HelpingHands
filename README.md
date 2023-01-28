# Seminars
Platform for blockchain based donations to charity

## Prerequisites

- Postman (For the account creation you will need postman because the accounts public addresses are generated in the local blockchain, so the ones created by us will not have an account in the chain. You can get postman at https://www.postman.com/downloads/)
- Ganache (You can download it at https://trufflesuite.com/ganache/)

## How to run

- Start ganache
- You can either choose the quickstart or a new workspace (we recommend creating a new workspace)
- If you created a new workspace:
  - Give it a name
  - Click on the "Accounts and Keys" tab
  - You can set the "Account Default Balance" to a fairly high number
  - You just need to generate one account
  - You can set the gas price to 0 in the "Chain" tab
- After creating the workspace open the root directory of the project and move to "Backend Server/config"
- In the json file change the public key and private key to the ones on the first account in ganache (you can get the keys by clicking the key symbol on the right of the account information in the "Accounts" tab
- Open a terminal in the root directory and run:
```
cd '.\Backend Server\'
npm install
npm run start
```
- After the server is up and running, open up postman to create the accounts needed for testing
- Set the route to POST http://localhost:8080/users
- In the body tab select "raw" and "JSON" from the dropdown
- You can set the body to the following:
```
{
   "name": "Test Donator",
   "password": "verySafePassword",
   "email": "testDonatorEmail@gmail.com",
   "role": "donator",
   "currentEther": 0,
   "country": "Portugal"
}
```
- Make sure ganache is running and send the request (You should get a 201 Created response status)
- Use the same route to create the association but with the following body:
```
{
   "name": "Test Association",
   "password": "verySafePassword",
   "email": "testAssociationEmail@gmail.com",
   "role": "association",
   "currentEther": 0,
   "description": "Very Good Association",
   "expenditureList": []
}
```
- Now open another terminal on the root directory and run:
```
cd .\frontend\
npm install
npm run start
```
- You can now login and navigate through the web app

Keep in mind that in order to do a donation, the donator has to have funds. You can add funds to the donator in its profile page by clicking the add funds button, setting the desired value in ether and clicking the submit button. 
To create an expenditure on an Association it must have enough ether to spend, so make sure to donate to it first as well.
