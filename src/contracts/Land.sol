// SPDX-License-Idenifier: MIT

pragma solidity ^0.8.0;

import  "@openzeppelin/contracts/token/ERC721/ERC721.sol"
contract Land is ERC721 {

    uint256 public cost = 1 ether;
    uint256 public maxSupply = 5;
    //totalSupply is default start point
    uint256 public totalSupply = 0;

    struct Building {
        string name;
        address owner;
        int256 posX;
        int256 posY;
        int256 posZ;
        uint256 sizeX;
        uint256 sizeY;
        uint256 sizeZ;
    }

    Building[] public buildings;

    // a constructor in sol contracts is a function 
    // that gets called with the contract

    // we specify the name of our nft in _name var
    // we specify the symbol of our nft in _symbol var

    // memory (which is not persisting + very temporary)
    // storage(where the state variables are held)

    // calling ERC721 constructor simultaneously. it takes name + symbol vars  

    constructor(string memory _name, string memory _symbol, uint265 _cost ) ERC721(_name, _symbol) {
        
    }

}