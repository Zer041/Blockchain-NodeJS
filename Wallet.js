const secureRandom = require('secure-random');
const ec = require('elliptic').ec;
const ecdsa = new ec('secp256k1');



class Wallet {

	constructor() {
		this.walletData = [];
		this.max = Buffer.from("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140", 'hex');
		this.privateKey = this.generatePrivateKey();
		this.publicKeys = this.walletData[2];
		this.isKeyValid = true;
		this.bytes = 32;
	}


	generatePrivateKey() {
		while(this.isKeyValid) {
			var privateKey = secureRandom.randomBuffer(this.bytes);
			if (Buffer.compare(this.max, privateKey) === 1) {
				this.isKeyValid = false;
				this.privateKey = privateKey;
				this.walletData.push(privateKey.toString('hex'));
			}
			return privateKey;
		}
	}

	getECDSAKeyFromPrivate() {
		let k = ecdsa.keyFromPrivate(this.privateKey);
		return ecdsa.keyFromPrivate(this.privateKey);;
	}

	generatePublicKey() {
		const ks = ecdsa.keyFromPrivate(this.privateKey);
		var publicKeys = ks.getPublic('hex');

		this.walletData.push(publicKeys);
		return publicKeys;
	}
}




module.exports = Wallet;
