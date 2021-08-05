import { ILightningApi } from './lightning-api.interface';

export interface AbstractLightningApi {
  $getGraphInfo(): Promise<ILightningApi.GraphInfo>
  $getLatestNodes(): Promise<any>
  $getNodeInfo(pub_key:string): Promise<ILightningApi.NodeInfo>
}
