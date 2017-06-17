const rp = require('request-promise');
const fs = require('fs');
const nodepath = require('path');
/**
 * Upload a simple smart contract from the file-system and call one of the
 * contract's methods. We then get the state of the contract to witness the
 * effect of calling the method.
 */

var blocUrl = 'http://localhost/bloc/v2.1'; //same url of our bloc-server used in config.yaml
var stratoUrl = 'http://localhost/strato-api'; //url of the strato instance that is running the blockchain, same as in config.yaml


/**
 * Load simple storage contract from the file-system
 */
 var sourceCode = fs.readFileSync('./contracts/SimpleStorage.sol').toString();
 var contractName = 'SimpleStorage';
 var password = 'httpPass';

/**
 * Get the address of user already created in the bloc-server
 */
var userName = 'http-call';
rp(blocUrl + '/users/' + userName).then(function(addresses) {
  console.log('Addresses of ' + userName + ' is:', addresses);

  var addrArray = JSON.parse(addresses); // the addresses array must be manually parsed.
  /**
   * Using one of these addresses, we can upload our contract.
   */
  var contractPayload = {
    password: password,  // password used to create address with
    src: sourceCode,  // the solidity source code of the contract
    args:{},   // constructor arguments
    contract: contractName,  //name of the contract to be uploaded. Solidity source code can have multiple contracts in it.
  };
  var options = {
      method: 'POST',
      uri: blocUrl + '/users/' +  userName + '/' + addrArray[0] + '/contract',
      body: contractPayload,
      json: true // Automatically stringifies the body to JSON
  };

  if(addresses.length < 1){
    console.log('No addresses created for user');
    return;
  }

  rp(options).then(function(contractAddress){
    console.log('Address of newly created contract is: ', contractAddress);
    // call the set method on our new contract

    // already have password as password
    // already have address as addrArray[0]

    var setMethodPayload = {
        "resolve": true,
        "password": password,
        "txs": [
          {
            "contractAddress": contractAddress,
            "args": { "x":10
                    },
            "contractName": contractName,
            "methodName": "set",
            "value": "0"
          }
        ]
    };

    var optionsSet = {
        method: 'POST',
        uri: blocUrl + '/users/' +  userName + '/' + addrArray[0] + '/callList',
        body: setMethodPayload,
        json: true // Automatically stringifies the body to JSON
    };

    rp(optionsSet).then(function(methodResponse){
      console.log('methodResponse is: ', methodResponse);
    });
  });

}).catch(function(err){
  console.log('an error occurred: ', err);
});
