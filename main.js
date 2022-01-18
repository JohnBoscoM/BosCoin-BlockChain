const SHA256 = require('crypto-js/sha256');

class Block {

constructor(index, timestamp, data, previousHash = ''){
    this.index = index; 
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = ''; 

}
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class BlockChain {
    constructor(){
        this.chain = [this.createBlockChain()];
    }
    createBlockChain(){
        return new Block(0, "18/01/2022", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1]; 
    } 

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash(); 
        this.chain.push(newBlock);
    }
}

let bosCoin = new BlockChain();
bosCoin.addBlock(new Block(1,"02/01/2022",{amount:4}))
bosCoin.addBlock(new Block(2,"02/01/2022",{amount:4}))

console.log(JSON.stringify(bosCoin,null,4));