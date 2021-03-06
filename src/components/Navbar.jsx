import React from "react";
import logo from "../assets/3d-logo.png";

const Navbar = ({ web3Handler, account }) => {
  return (
    <nav className="flex-between">
      <a className="flex">
        <img src={logo} className="App-logo" alt="logo" />
        Dapp University
      </a>

      {account ? (
        <a
          href={`${""}/address/${account}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          {account.slice(0, 5) + "..." + account.slice(38, 42)}
        </a>
      ) : (
        <button onClick={web3Handler} className="button">
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navbar;
