export namespace ILightningApi {
  export interface GraphInfo {
    graph_diameter: number;
    avg_out_degree: number;
    max_out_degree: number;
    num_nodes: number;
    num_channels: number;
    total_network_capacity: string;
    avg_channel_size: string;
    min_channel_size: string;
    max_channel_size: string;
    median_channel_size_sat: string;
    num_zombie_chans: string;
  }

  export interface NodeAddress {
    network: string;
    addr: string;
  }

  export interface Node {
    last_update: number;
    pub_key: string;
    alias: string;
    addresses: NodeAddress[];
    color: string;
    features: object;
  }

  export interface Channel {
    channel_id: number;
    chan_point: string;
    last_update: number;
    node1_pub: string;
    node2_pub: string;
    capacity: string;
    node1_policy: RoutingPolicy;
    node2_policy: RoutingPolicy;
  }

  export interface RoutingPolicy {
    time_lock_delta: number;
    min_htlc: string;
    fee_base_msat: string;
    fee_rate_milli_msat: string;
    disabled: boolean;
    max_htlc_msat: string;
    last_update: number;
  }

  export interface NodeInfo {
    node: Node;
    num_channels: number;
    total_capacity: string;
    channels: Channel[];
  }
}
