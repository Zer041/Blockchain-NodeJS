const Block = require('./Block.js');
const Wallet = require('./Wallet.js')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const SHA256 = require('crypto-js/sha256');


class Transaction {
	constructor(timestamp, fromAddress, toAddress, ammount) {
		this.timestamp = timestamp;
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.ammount = ammount;
	}


	calculateHash() {
		return SHA256(this.timestamp + this.fromAddress + this.toAddress + this.ammount).toString().toString();
	}


	signTransaction(signingKey) {
		if (signingKey.getPublic('hex') !== this.fromAddress) {
			throw new Error('You cannot sign transaction for other Wallets');
		}

		const transactionHash = this.calculateHash();
		const signa = signingKey.sign(transactionHash, 'base64');

		this.signature = signa.toDER('hex');
	}



	isValid() {
		if (this.fromAddress === null) {
			return true;
		}
		if (!this.signature || this.signature.length === 0) {
			throw new Error('You dont have a signature for this transaction');
		}


		const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
		return publicKey.verify(this.calculateHash(), this.signature);
	}
}

module.exports = Transaction;
