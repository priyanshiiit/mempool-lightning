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

  $getNodeInfo(pub_key:string): Promise<ILightningApi.NodeInfo> {
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

  $getLatestNodes(): Promise<ILightningApi.Node>{
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
      .then((response) => {
        const nodes= response.data.nodes;
        nodes.sort(function(a,b){return b.last_update-a.last_update});
        const tenLatestNodes=nodes.slice(0,10);
        return tenLatestNodes;
      });
  }

}

export default LightningApi;
