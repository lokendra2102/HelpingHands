import React from 'react';

const About = () => {
  return (
    <div
      style={{
        justifyContent: 'left',
        alignItems: 'left',
        height: '100%',
        padding: "0.2rem calc((100vw - 1000px) / 10)",
        backgroundColor: "#f2f2f2"
      }}
    >
      <h1>About the Product</h1>
      <p>Our platform makes Ether fundraising easy for nonprofits. Empowering mission-driven organizations, charities, universities, and faith-based organizations of all sizes to leverage crypto technology to achieve their mission.</p>
      <p>We developed a platform to make the institutions expenditures more transparent, in order to increase trust on the donators side. To achieve, this goal, we decided to develop our platform based on blockchain technology, more specifically Ethereum</p>

      <h2>What is Blockchain?</h2>
      <p>Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system.
        <p>A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems on the blockchain. Each block in the chain contains a number of transactions, and every time a new transaction occurs on the blockchain, a record of that transaction is added to every participant’s ledger. The decentralised database managed by multiple participants is known as Distributed Ledger Technology (DLT).</p>
        <p>Blockchain is a type of DLT in which transactions are recorded with an immutable cryptographic signature called a hash.</p>
      </p>

      <h2>How do transactions get into the Blockchain?</h2>
      <p>For a public blockchain, the decision to add a transaction to the chain is made by consensus. This means that the majority of “nodes” (or computers in the network) must agree that the transaction is valid. The people who own the computers in the network are incentivised to verify transactions through rewards. This process is known as ‘proof of work’.</p>
      <h3>How does Proof Of Work functions?</h3>
      <p>Proof of Work requires the people who own the computers in the network to solve a complex mathematical problem to be able to add a block to the chain. Solving the problem is known as mining, and ‘miners’ are usually rewarded for their work in cryptocurrency.
        <p>  But mining isn’t easy. The mathematical problem can only be solved by trial and error and the odds of solving the problem are about 1 in 5.9 trillion. It requires substantial computing power which uses considerable amounts of energy. This means the rewards for undertaking the mining must outweigh the cost of the computers and the electricity cost of running them, as one computer alone would take years to find a solution to the mathematical problem.</p>
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={'/static/images/blockchain_transactions.png'} style={{ width: '50%' }} />
      </div>
      <h2>What is Ethereum and how does it work?</h2>
      <p>Ethereum is often referred to as the second most popular cryptocurrency, after Bitcoin. But unlike Bitcoin—and most other virtual currencies—Ethereum is intended to be much more than simply a medium of exchange or a store of value. Instead, Ethereum calls itself a decentralized computing network built on blockchain technology. Let’s unpack what that means.</p>
      <p>What’s unique about Ethereum is that users can build applications that “run” on the blockchain like software “runs” on a computer. These applications can store and transfer personal data or handle complex financial transactions.</p>

    </div>
  );
};

export default About;