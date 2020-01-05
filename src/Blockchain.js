const Block = require('./Block.js');
const Transaction = require('./Transaction');




class Blockchain {
	constructor () {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 3;
		this.pendingTransactions = [new Transaction(new Date().toJSON(), null, "minero nº1", this.miningReward, null)];
		this.miningReward = 1000
	}

	createGenesisBlock() {
		var x = new Block(new Date().toJSON(), [], "null");
		console.log("Bloque genesis: \n");

		console.log("Timestamp: " + x.timestamp);
		console.log("Hash del bloque anterior: " + x.previousHash);
		console.log("Hash del bloque actual: " + x.hash);
		console.log("Numero de transacciones en el bloque: " + x.transactions.length);
		console.log("Nonce: " + x.nonce);

		return x;
	}


	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	minePendingTransactions(mineAddressWinner) {
		let block = new Block(new Date().toJSON(), this.pendingTransactions, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);
		this.chain.push(block);


		this.pendingTransactions = [
			new Transaction(new Date().toJSON(), null, mineAddressWinner, this.miningReward, null)
		];

		// mostrar datos del bloque de forma ordenada
		console.log("Nuevo bloque minado: \n");

		console.log("Timestamp: " + block.timestamp);
		console.log("Hash del bloque anterior: " + block.previousHash);
		console.log("Hash del bloque actual: " + block.hash);
		console.log("Numero de transacciones en el bloque: " + block.transactions.length);
		console.log("Nonce: " + block.nonce);
	}

	getBlocks() {
		return this.chain;
	}

	addTransaction(transaction) {
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error('Incomplete addresses');
		}
		if (!transaction.isValid()) {
			throw new Error('Cannot add invalid transaction to the chain');
		}

		this.pendingTransactions.push(transaction);
	}



	returnPendingTransactions() {
		return this.pendingTransactions[this.pendingTransactions.length-1];
	}



	getAddressBalance(address) {
		let balance = 0;

 		for (const block of this.chain) {
		    for (const trans of block.transactions) {
 			    if (trans.fromAddress === address) {
        		   	balance -= trans.ammount;
      		}

      		if (trans.toAddress === address) {
        			balance += trans.ammount;
      		}
    		}
  	}
  	if (balance >= 0) {
  		return balance;
  	} else {
  		throw new Error("Negative Balance, Balance can't be negative");
  	}
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	// now we want a function that verifies every hashs block is correct and that all the blocks are refered to his previous block
	isChainValid() {
		for (let i = 0; i < this.chain.lenght; i++) {
			// counters
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (!currentBlock.hasValidTransactions()) {
				return false;
			}
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
			if (currentBlock.previousHash !== previousBlock.calculateHash()) {
				return false;
			}
		}
		console.log('Valid Chain, hash of blocks correct, previousHashes correct');
		return true;
	}
};


module.exports = Blockchain;
