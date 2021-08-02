import config from "../../config";
import { ILightningApi } from "./lightning-api.interface";
import axios from "axios";
const request = require('request');
const fs = require('fs');
// import blocks from '../blocks';
// import mempool from '../mempool';
// import { TransactionExtended } from '../../mempool.interfaces';

class LightningApi {
  constructor() {}
  private macaroon = fs.readFileSync('/Users/rishabh/Library/Application Support/Lnd/data/chain/bitcoin/testnet/admin.macaroon').toString('hex');

  $getGraphInfo(): Promise<ILightningApi.GraphInfo> {
    let options = {
      url: 'https://localhost:8080/v1/graph/info',
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true, 
      headers: {
    'Grpc-Metadata-macaroon': this.macaroon,
  },
    };
    console.log(this.macaroon);
    console.log('getting api')

    request.get(options, function(error, response, body) {
      console.log(body);
    });
    
    return new Promise((resolve,reject) => {
    request.get(options, function(error, response, body) {
    resolve(body);
        });
      })
    

  }
}

export default LightningApi;
