import config from "../../config";
import { ILightningApi } from "./lightning-api.interface";
import axios from "axios";
// import blocks from '../blocks';
// import mempool from '../mempool';
// import { TransactionExtended } from '../../mempool.interfaces';
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
}

export default LightningApi;
