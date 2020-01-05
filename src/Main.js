const Transaction = require('./Transaction.js');
const Blockchain = require('./Blockchain.js');
const Block = require('./Block.js');
const Wallet = require('./Wallet.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');




var main = function() {
	const BlockchainObj = new Blockchain();
	const wallet = new Wallet();

	wallet.generatePrivateKey();
	const myKey = wallet.getECDSAKeyFromPrivate();
	const myWalletAddress = wallet.generatePublicKey();

	BlockchainObj.minePendingTransactions(myWalletAddress);

	// bloque 1
  const tx1 = new Transaction(Date.now(), myWalletAddress, 'PublicAddressOne', 100, null);

 	tx1.signTransaction(myKey);

 	BlockchainObj.addTransaction(tx1);
	BlockchainObj.minePendingTransactions(myWalletAddress);


	// bloque 2
	const tx3 = new Transaction(Date.now(), myWalletAddress, 'PublicAddressTwo', 100, null);
	const tx4 = new Transaction(Date.now(), myWalletAddress, 'PublicAddressThree', 100, null);
	const tx5 = new Transaction(Date.now(), myWalletAddress, 'PublicAddressFour', 100, null);


	tx3.signTransaction(myKey);
	tx4.signTransaction(myKey);
	tx5.signTransaction(myKey);

	BlockchainObj.addTransaction(tx3);
	BlockchainObj.addTransaction(tx4);
	BlockchainObj.addTransaction(tx5);
	BlockchainObj.minePendingTransactions(myWalletAddress);

	console.log('Balance of my test wallet is: ', BlockchainObj.getAddressBalance(myWalletAddress));
	//console.log(BlockchainObj.getBlocks());
	//console.log("BlockchainObj finalizada con dificultad: " + BlockchainObj.difficulty);
}


if (require.main === module) {
	main();
}




















































































// old tests code (inside main)
/*
	//console.log("Mining block 1...");
	//Blockchain.addBlock(new Block("01/11/2014", { ammount: 4 }));

	//console.log("Mining block 2...");
	//Blockchain.addBlock(new Block("03/12/2015", { ammount: 5 }));

	// uncomment this lines for output the Json format of the blocks
	// console.log(JSON.stringify(Blockchain, null, 4));
	// console.log(JSON.stringify(Blockchain, null, 4));

	Blockchain.createTransaction(new Transaction(Date.now(), 'elena', 'diego', 300));
	Blockchain.createTransaction(new Transaction(Date.now(), 'diego', 'elena', 50));
	Blockchain.createTransaction(new Transaction(Date.now(), 'dieego', 'eqlena', 520));
	console.log('balance of AddressWinner:', Blockchain.getAddressBalance('AddressWinner'));

	console.log(Blockchain.returnPendingTransactions());
	console.log('\n Starting miner...');
	Blockchain.minePendingTransactions('AddressWinner');

	console.log('\n Checking account balance');
	console.log('balance of Elena:', Blockchain.getAddressBalance('elena'));
	console.log('balance of Diego:', Blockchain.getAddressBalance('dieego'));
	console.log('balance of AddressWinner:', Blockchain.getAddressBalance('AddressWinner'));

	//Blockchain.createTransaction(new Transaction('Elena', 'Diego', 360));
	//Blockchain.createTransaction(new Transaction('Diego', 'Elena', 80));


	//console.log('\n Checking account balance');
	//console.log('balance of Elena:', Blockchain.getAddressBalance('Elena'));
	//console.log('balance of Diego:', Blockchain.getAddressBalance('Diego'));


	console.log('\n Starting miner again...');
	Blockchain.minePendingTransactions('AddressWinner');

	console.log(Blockchain.returnPendingTransactions());
	console.log('\n Checking account balance');
	console.log('balance of Elena:', Blockchain.getAddressBalance('elena'));
	console.log('balance of Diego:', Blockchain.getAddressBalance('dieego'));
	console.log('balance of AddressWinner:', Blockchain.getAddressBalance('AddressWinner'));

	console.log(Blockchain.returnPendingTransactions());
	console.log('\n Starting miner again...');
	Blockchain.minePendingTransactions('AddressWinner');


	console.log('\n Checking account balance');
	console.log('balance of Elena:', Blockchain.getAddressBalance('elena'));
	console.log('balance of Diego:', Blockchain.getAddressBalance('dieego'));
	console.log('balance of AddressWinner:', Blockchain.getAddressBalance('AddressWinner'));


	console.log(Blockchain.returnPendingTransactions());
//	console.log('\n Checking account balance');
//	console.log('balance of Address-Winner:', Blockchain.getAddressBalance('AddressWinner'));

//	console.log('\n Starting miner...');
//	Blockchain.minePendingTransactions('AddressWinner');
*/
