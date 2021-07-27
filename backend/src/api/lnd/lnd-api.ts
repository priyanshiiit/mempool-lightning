import config from "../../config";
import { AbstractLndApi } from "./lnd-api-abstract-factory";
import { GraphInfo } from "./lnd-api.interface";
const request = require("request");
// import blocks from '../blocks';
// import mempool from '../mempool';
// import { TransactionExtended } from '../../mempool.interfaces';

class LndApi {
  constructor() {}
  private macaroon =
    "0201036C6E6402F801030A10022730C1C8DF55A916C26F14A88602BA1201301A160A0761646472657373120472656164120577726974651A130A04696E666F120472656164120577726974651A170A08696E766F69636573120472656164120577726974651A210A086D616361726F6F6E120867656E6572617465120472656164120577726974651A160A076D657373616765120472656164120577726974651A170A086F6666636861696E120472656164120577726974651A160A076F6E636861696E120472656164120577726974651A140A057065657273120472656164120577726974651A180A067369676E6572120867656E6572617465120472656164000006205ED131D364C6D17A58C0C6BADC262EEC6F203C6A966911C8A2E1F2A796CED5BF";

  $getGraphInfo(): Promise<GraphInfo | undefined> {
    let options = {
      url: "http://localhost:8080/v1/graph/info",
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        "Grpc-Metadata-macaroon": this.macaroon,
      },
    };
    return new Promise((resolve) => {
      request.get(options, function (error, response, body) {
        if (!error) {
          resolve(body);
        }
      });
    });
   
  }
}

export default new LndApi();
