import config from '../../config';
import { AbstractLightningApi } from './lightning-api-abstract-factory';
// import EsploraApi from './esplora-api';
// import ElectrumApi from './electrum-api';
import LightningApi from './lightning-api';

function lightningApiFactory(): AbstractLightningApi {
  switch (config.MEMPOOL.BACKEND) {
    // case 'esplora':
    //   return new EsploraApi();
    // case 'electrum':
    //   return new ElectrumApi();
    case 'none':
    default:
      return new LightningApi();
  }
}

export default lightningApiFactory();
