const Land = artifacts.require("./Land");

// takes 2 vars, contract name
// and the test function that will run
contract("Land", () => {
  // we need these variables to satisfy constructor + deploy contract
  const NAME = "Dapp U Buildings";
  const SYMBOL = "DUB";
  const COST = web3.utils.toWei("1", "ether");

  // to check if land = expected results
  let land, result;

  // before each test we deploy contract
  beforeEach(async () => {
    // new deploys the Land contract
    // saved in land var to check with above results
    //await: function is waiting for this to
    // happen to finish deployment
    land = await Land.new(NAME, SYMBOL, COST);
  });

  // first test is the deployment to check vars are set to expectations
  describe("Deployment");
});
