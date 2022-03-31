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
}