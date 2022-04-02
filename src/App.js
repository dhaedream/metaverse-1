import "./App.css";
import Web3 from "web3";
import { useState, useEffect } from "react";

function App() {
  // ready to pull web3 object/s into app +
  // using set ... to update info in app
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [landContract, setLandContract] = useState(null);
  const [cost, setCost] = useState(0);
  const [buildings, setBuildings] = useState(null);

  return (
    <div className="">
      <p>DAPPing It !!</p>
    </div>
  );
}

export default App;
