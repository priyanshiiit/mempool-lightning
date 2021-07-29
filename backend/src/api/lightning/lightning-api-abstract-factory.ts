import { ILightningApi } from './lightning-api.interface';

export interface AbstractLightningApi {
  $getGraphInfo(): Promise<ILightningApi.GraphInfo>

}
