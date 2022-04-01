// SPDX-License-Idenifier: MIT

pragma solidity ^0.8.0;

import  "@openzeppelin/contracts/token/ERC721/ERC721.sol"
contract Land is ERC721 {

    uint256 public cost = 1 ether;
    // max supply is # of buildings 
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

    constructor(string memory _name, string memory _symbol, uint265 _cost ) ERC721(_name, _symbol) {
        cost = _cost;
        buildings.push(
            Building("City Hall", address(0x0), 0, 0, 0, 10, 10, 10)
        );
         buildings.push(
            Building("Park", address(0x0), 0, 10, 0, 10, 5, 5)
        ); 
        buildings.push(
            Building("School", address(0x0), 0, -10, 0, 10, 5, 5)
        ); 
        buildings.push(
            Building("Gym", address(0x0), 10, 0, 0, 5, 25, 5)
        ); 
        buildings.push(
            Building("Vegan Restaurant", address(0x0), -10, 0, 0, 5, 25, 5)
        );
    }
    //function is reusable code to be called whenever needed
    //to mint/buy land
    //public: anybody can call it
    //payable: can send currency to function
    function mint(uint256 _id) public payable {
        // to make sure land is available 
        uint256 supply = totalSupply;
        // require checks for condition in order to run function
        // supply must be less than maxSupply which is total available buildings 
        require(supply <= maxSupply);
        // make sure building owner = 0x0
        require(buildings[_id -1].owner == address(0x0));
        // making sure ether sent to payable function is equal/greater than to cost
        require(msg.value >= 1ether);
    }


}