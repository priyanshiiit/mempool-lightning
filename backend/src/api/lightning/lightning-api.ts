import { ILightningApi } from "./lightning-api.interface";
import axios from "axios";
const fs = require("fs");

let m = fs.readFileSync(
  "/home/prince/gocode/dev/alice/data/chain/bitcoin/testnet/admin.macaroon"
);
const macaroon = m.toString("hex");

class LightningApi {
  constructor() {}

  $getGraphInfo(): Promise<ILightningApi.GraphInfo> {
    let options = {
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        "Grpc-Metadata-macaroon": macaroon,
      },
    };

    return axios
      .get("http://localhost:8080/v1/graph/info", options)
      .then((response) => {
        return response.data;
      });
  }

  $getNodeInfo(pub_key: string): Promise<ILightningApi.NodeInfo> {
    let options = {
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        "Grpc-Metadata-macaroon": macaroon,
      },
    };

    return axios
      .get(`http://localhost:8080/v1/graph/node/${pub_key}`, options)
      .then((response) => {
        return response.data;
      });
  }

  async $getLatestNodes(): Promise<any> {
    let options = {
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        "Grpc-Metadata-macaroon": macaroon,
      },
    };

    return axios
      .get(`http://localhost:8080/v1/graph`, options)
      .then(async (response) => {
        const nodes = response.data.nodes;
        nodes.sort(function (a, b) {
          return b.last_update - a.last_update;
        });
        const tenLatestNodes = nodes.slice(0, 10);
        const promises = tenLatestNodes.map(async (nodeIt) => {
          const details = await this.$getNodeInfo(nodeIt.pub_key);
          var node: any = {};
          node.pub_key = details.node.pub_key;
          node.alias = details.node.alias;
          node.total_capacity = details.total_capacity;
          node.num_channels = details.num_channels;
          console.log(node);
          return node;
        });
        return Promise.all(promises)
          .then((results) => {
            // Handle results
            return results;
          })
      });


    //ASYNC-AWAIT
    // const response:any=await axios.get(`http://localhost:8080/v1/graph`, options)
    // const nodes=response.data.nodes
    // nodes.sort(function(a,b){return b.last_update-a.last_update});
    // const tenLatestNodes=nodes.slice(0,10);
    // const promises=tenLatestNodes.map(async (nodeIt)=>{
    //         const details=await this.$getNodeInfo(nodeIt.pub_key)
    //         var node:any={};
    //         node.pub_key=details.node.pub_key;
    //         node.alias=details.node.alias;
    //         node.total_capacity=details.total_capacity;
    //         node.num_channels=details.num_channels;
    //         return node
    //       })
    //     const finalNodes:any=[];
    //       for await (let val of promises){
    //        finalNodes.push(val)
    //      }
    // return finalNodes
  }

  $getLatestChannels(): Promise<ILightningApi.Channel>{
    let options = {
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        "Grpc-Metadata-macaroon": macaroon,
      },
    };

    return axios
    .get("http://localhost:8080/v1/graph", options)
    .then((response) => {
      const channels= response.data.edges;
      channels.sort(function(a,b){return b.last_update-a.last_update});
      const tenLatestChannels=channels.slice(0,10);
      return tenLatestChannels;
    });

  }
  $getChannelInfo(chan_id:string):Promise<ILightningApi.Channel>{
    let options = {
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true, 
      headers: {
        'Grpc-Metadata-macaroon': macaroon,
      },
    }

    return axios
    .get(`http://localhost:8080/v1/graph/edge/${chan_id}`, options)
    .then((response) => {
      return response.data;
    });
  }
}

export default LightningApi;
