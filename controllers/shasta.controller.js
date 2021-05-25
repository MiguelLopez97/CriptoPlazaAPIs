'use strict'

const TronWeb = require('tronweb');
const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';
const privateKey = 'c6121fd8eab36bf6ca01a5096af69b083a3cd84dbabea603c80ee4a7839c2f2a'; // private key de cualquier address, no hay problema si no la cambias
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

//Variables y constantes para EncodeParams()
var ethers = require('ethers');
const AbiCoder = ethers.utils.AbiCoder;
const ADDRESS_PREFIX_REGEX = /^(41)/;
const ADDRESS_PREFIX = '41';

var controller = {

  convertirHex: (request, response) => {
    //Obtiene el parámetro que viene por la URL
    var address = request.params.address;

    const stringToHex = tronWeb.address.toHex(address);

    return response.status(200).send({
      stringToHex,
      success: true
    });
  },

  generateAddress: async (request, response) => {
    try
    {
      let address = await tronWeb.createAccount();

      return response.status(200).send({
        address,
        success: true
      });
    }
    catch (error) 
    {
      return response.status(500).send({
        error,
        success: false
      });
    }
  },

  encodeParams: (request, response) => {
    let typesValues = [
      { type: 'address', value: request.body.address },
      { type: 'uint256', value: request.body.uint256 }
    ];

    let parameters = '';
      
    if (typesValues.length == 0) return parameters;

    const abiCoder = new AbiCoder();
    let types = [];
    const values = [];
      
    for (let i = 0; i < typesValues.length; i++) 
    {
      let { type, value } = typesValues[i];
      if (type == 'address') value = value.replace(ADDRESS_PREFIX_REGEX, '0x');
      else if (type == 'address[]') value = value.map((v) => toHex(v).replace(ADDRESS_PREFIX_REGEX, '0x'));
      types.push(type);
      values.push(value);
    }
      
    //console.log(types, values);
    try 
    {
      parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');

      return response.status(200).send({
        values: {
          address: values[0],
          uint256: values[1]
        },
        parameters,
        success: true
      }); 
    } 
    catch (error) 
    {
      return response.status(500).send({
        error,
        success: false
      }); 
    }    
  }
}

module.exports = controller;