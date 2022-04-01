const Land = artifacts.require("./Land");

//require chai
require("chai").use(require("chai-as-promised")).should();

// takes 2 vars, contract name
// and the test function that will run
//owners from ganache for spending test ether
contract("Land", ([owner1, owner2]) => {
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

  // first test is the deployment to
  //verify that vars are set to expectations
  //"describe" runs many test described by "it"
  describe("Deployment", () => {
    //   takes in what it does + test function that calls name var
    it("returns contract name", async () => {
      //access smart contract "land" + call name var
      //awaiting "beforeEach" then result should equal name
      result = await land.name();
      //using chai keyword shoud for test
      result.should.equal(NAME);
    });
    it("returns symbol", async () => {
      result = await land.symbol();
      result.should.equal(SYMBOL);
    });
    it("returns cost to mint/buy", async () => {
      result = await land.cost();
      result.toString().should.equal(COST);
    });
    it("returns max supply", async () => {
      result = await land.maxSupply();
      result.toString().should.equal("5");
    });
    it("returns # of buildings available", async () => {
      result = await land.getBuildings();
      result.length.should.equal(5);
    });
  });

  describe("Minting", () => {
      describe("Successful purchase", () => {
        //before each test we mint a plot of land w/ id of 1
        // AND specify the address buying land AND cost
          result = await land.mint(1, { from: owner1, value: COST })

        // after yu mint NodeFilter, owner address should be updated 
        it("Updates owner address", async () => {
            result = await land.ownerOf(1)
            result.should.equal(owner1)
        })

        // check if building is added to array 
        it("Updates building details", async () => {
            result = await land.getBuilding(1)
            result.owner1.should.equal(owner1)
        })
      })    
  })

  describe('Failure', () => {
      
  })

});
