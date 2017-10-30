const Web3 = require('web3');
const {ZeroEx} = require('0x.js');

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const zeroEx = new ZeroEx(provider);

async function getAddress() {
  try {
    var availableAddresses = await zeroEx.getAvailableAddressesAsync();
    console.log(availableAddresses);
  } catch (error) {
    console.log('Caught error: ', error);
  }
}

getAddress();
