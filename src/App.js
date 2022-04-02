import "./App.css";
import Web3 from "web3";
import { useState, useEffect } from "react";
// all contract functions r contained in this file
import Land from "./abis/Land.json";

function App() {
  // Contract & Contract States
  // setting up App useStates to target + handle
  // smart contract data + update render as it evolves on blockchain
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [landContract, setLandContract] = useState(null);
  const [cost, setCost] = useState(0);
  const [buildings, setBuildings] = useState(null);

  // to load changes of smart contract: useEffect
  //

  useEffect(() => {
    loadBlockchainData();
  }, [account]);

  const loadBlockchainData = async () => {
    //require that metamask is installed by checking forether window object
    if (typeof window.ethereum !== "undefined") {
      // load web3 object from Web3 library
      const web3 = new Web3(window.ethereum);
      // assigning useState
      setWeb3(web3);
      // get user accounts
      const accounts = await web3.eth.getAccounts();
      // if there are accounts, initialize the 1st index of array as 0
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
      // get network id
      const networkId = await web3.eth.net.getId();

      //target data from json file import
      // make contract instance
      const land = new web3.eth.Contract(
        Land.abi,
        Land.networks[networkId].address
      );
      setLandContract(land);
      //get + set cost
      const cost = await land.methods.cost().call();
      setCost(web3.utils.fromWei(cost.toString(), "ether"));

      const buildings = await land.methods.getBuildings().call();
      setBuildings(buildings);

      // event listener when accounts/blockchain change, update it
      window.ethereum.on("accountsChanged", function (accounts) {
        setAccount(accounts[0]);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }
  };

  //metamask login as referenced in Navbar
  const web3Handler = async () => {
    if (web3) {
      const accounts = await window.ethereum.request({
        metid: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  return (
    <div className="">
      <p>DAPPing It !!</p>
    </div>
  );
}

export default App;
