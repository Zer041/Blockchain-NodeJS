const Transaction = require('./Transaction.js');
const SHA256 = require('crypto-js/sha256');
const RIPEMD160 = require('crypto-js/ripemd160');




class Block {
	constructor (timestamp, transactions, previousHash = '') {
		this.timestamp = timestamp;				// the date of the transference
		this.transactions = transactions;		// data transference
		this.previousHash = previousHash;		// string that contains previousHash of the transference
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return RIPEMD160(SHA256(this.timestamp + this.previousHash + this.nonce + this.transactions).toString()).toString();
	}

	mineBlock(difficulty) {
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
	}

	// we want to make a function that verifies the transactions of the current block so we will iterate for every element of the block verifying it
	hasValidTransactions() {
		for(const Transaction of this.transactions) {
			if(!Transaction.isValid()) {
				return !true;
			}
		}
		return true;
	}
}


module.exports = Block;
