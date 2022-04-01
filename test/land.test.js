const Land = artifacts.require("./Land");

//require chai
require("chai").use(require("chai-as-promised")).should();

const EVM_REVERT = "VM Exception while processing transaction: revert";

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
      beforeEach(async () => {
        result = await land.mint(1, { from: owner1, value: COST });
      });

      // after yu mint NodeFilter, owner address should be updated
      it("Updates owner address", async () => {
        result = await land.ownerOf(1);
        result.should.equal(owner1);
      });

      // check if building is added to array
      it("Updates building details", async () => {
        result = await land.getBuilding(1);
        result.owner1.should.equal(owner1);
      });
    });
  });
  //   when fail or should fail
  describe("Failure", () => {
    //fail if no money is sent for plot of land "1"
    it("prevents mint with 0 value", async () => {
      await land
        .mint(1, { from: owner1, value: 0 })
        .shpuld.be.rejectedWith(EVM_REVERT);
    });
    //fail bc id 100 does not exist
    it("Prevents mint with invalid ID", async () => {
      await land
        .mint(100, { from: owner1, value: COST })
        .should.be.rejectedWith(EVM_REVERT);
    });
    //   owner 2 cant buy a plot of land already brought
    it("Prevents minting if already owned", async () => {
      await land.mint(1, { from: owner1, value: COST });
      await land
        .mint(1, { from: owner2, value: COST })
        .should.be.rejectedWith(EVM_REVERT);
    });
  });

  describe("Transfers", () => {
    describe("success", () => {
      // before each test we have to simulate a plot
      // of land being purchased + transfered
      beforeEach(async () => {
        await land.mint(1, { from: owner1, value: COST });
        await land.approve(owner2, 1, { from: owner1 });
        await land.transferFrom(owner1, owner2, 1, { from: owner2 });
      });

      it("Updates the owner address", async () => {
        result = await land.ownerOf(1);
        result.should.equal(owner1);
      });

      it("Updates building details", async () => {
        result = await land.getBuilding(1);
        result.owner.should.equal(owner1);
      });
    });

    describe("failure", () => {
      it("Prevents transfers without ownership", async () => {
        await land
          .transferFrom(1, { from: owner2 })
          .should.be.rejectedWith(EVM_REVERT);
      });

      it("Prevents transfers without approval", async () => {
        await land.mint(1, { from: owner1, value: COST });
        await land
          .transferFrom(owner1, owner2, 1, { from: owner2 })
          .should.be.rejectedWith(EVM_REVERT);
      });
    });
  });
});
