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
      url: 'http://localhost:8080/v1/graph/info',
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true, 
      headers: {
    'Grpc-Metadata-macaroon': this.macaroon,
  },
    };
    console.log(this.macaroon);
    console.log('getting api')
    
    return new Promise((resolve,reject) => {
    request.get(options, function(error, response, body) {
    resolve(body);
        });
      })
    
    }
    $getNodeInfo(pub_key:string): Promise<ILightningApi.NodeInfo> {
      let options = {
        url: `http://localhost:8080/v1/graph/node/${pub_key}?include_channels=true`,
        // Work-around for self-signed certificates.
        rejectUnauthorized: false,
        json: true,
        headers: {
          "Grpc-Metadata-macaroon": this.macaroon,
        },
      };
      console.log('reached 1')
      console.log(options.url)
      return new Promise((resolve,reject) => {
        request.get(options, function(error, response, body) {
        console.log(error)
        console.log(body)
        resolve(body);
        console.log('reached 3')
            });
          })
  
      // return axios
      //   .get(`http://localhost:8080/v1/graph/node/${pub_key}`, options)
      //   .then((response) => {
      //     return response.data;
      //   });
    }
  
    $getLatestNodes(): Promise<ILightningApi.Node>{
      let options = {
        url: `http://localhost:8080/v1/graph`,
        // Work-around for self-signed certificates.
        rejectUnauthorized: false,
        json: true,
        headers: {
          "Grpc-Metadata-macaroon": this.macaroon,
        },
      };

      return new Promise((resolve,reject) => {
        request.get(options, function(error, response, body) {
          const nodes= body.nodes;
          nodes.sort(function(a,b){return b.last_update-a.last_update});
          const tenLatestNodes=nodes.slice(0,10);
          resolve(tenLatestNodes);
            });
          })
  
      return axios
        .get(`http://localhost:8080/v1/graph`, options)
        .then((response) => {
          const nodes= response.data.nodes;
          nodes.sort(function(a,b){return b.last_update-a.last_update});
          const tenLatestNodes=nodes.slice(0,10);
          return tenLatestNodes;
        });
      
    }

    $getLatestChannels(): Promise<ILightningApi.Channel>{
      let options = {
        url: `http://localhost:8080/v1/graph`,
        // Work-around for self-signed certificates.
        rejectUnauthorized: false,
        json: true,
        headers: {
          "Grpc-Metadata-macaroon": this.macaroon,
        },
      };

      return new Promise((resolve,reject) => {
        request.get(options, function(error, response, body) {
          const channels= body.edges;
          channels.sort(function(a,b){return b.last_update-a.last_update});
          const tenLatestChannels=channels.slice(0,10);
          resolve(tenLatestChannels);
            });
          })
  
      return axios
        .get(`http://localhost:8080/v1/graph`, options)
        .then((response) => {
          const nodes= response.data.nodes;
          nodes.sort(function(a,b){return b.last_update-a.last_update});
          const tenLatestNodes=nodes.slice(0,10);
          return tenLatestNodes;
        });
      
    }

    $getChannelInfo(chan_id: string): Promise<ILightningApi.Channel>{
      let options = {
        url: `http://localhost:8080/v1/graph/edge/${chan_id}`,
        // Work-around for self-signed certificates.
        rejectUnauthorized: false,
        json: true, 
        headers: {
          'Grpc-Metadata-macaroon': this.macaroon,
        },
      }
      return new Promise((resolve,reject)=>{
        request.get(options, function(error, response, body) {
          resolve(body);
        });
      })
    }
    


}

export default LightningApi;
