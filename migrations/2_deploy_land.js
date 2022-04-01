// requires json file "artifact" which is the Land cntract
const Land = artifacts.require("Land");

//(async + await)asynchronous, promise-based behavior
//to explicitly configure promise chains
module.exports = async function (deployer) {
  // deploy land with a constructr
  // we need to pass constructor parameters here
  const NAME = "Dapp U Buildings";
  const SYMBOL = "DUB";
  //solidity smart contract take values in Wei
  //this is how we convert 1 ether > Wei
  const COST = web3.utils.toWei("1", "ether");
  // await waits for contract to be
  //Deploy contract + pass variables
  await deployer.deploy(Land, NAME, SYMBOL, COST);
};
