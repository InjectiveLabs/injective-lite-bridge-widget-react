export enum WalletConnectStatus {
  Idle = "Idle",
  Connected = "Connected",
  Connecting = "Connecting",
  Disconnected = "Disconnected",
}

export enum EventBus {
  WalletConnected = "wallet-connected",
  SubaccountChange = "subaccount-change",
}

export enum Network {
  Axelar = "axelar",
  Canto = "canto",
  Chihuahua = "chihuahua",
  CosmosHub = "cosmosHub",
  Ethereum = "ethereum",
  EthereumWh = "ethereumWh",
  Evmos = "evmos",
  Fetch = "fetch",
  Injective = "injective",
  Juno = "juno",
  Osmosis = "osmosis",
  Persistence = "Persistence",
  Terra = "terra",
  Secret = "secret",
  Stride = "stride",
  Crescent = "crescent",
  Solana = "solana",
  Sommelier = "sommelier",
  Arbitrum = "arbitrum",
  Polygon = "polygon",
  Klaytn = "klaytn",
  Sui = "sui",
  Kava = "kava",
  Oraichain = "oraichain",
  Noble = "noble",
  Celestia = "celestia",
  Migaloo = "migaloo",
  Kujira = "kujira",
  CosmosHubTestnet = "cosmosHub-testnet",
  Andromeda = "andromeda",
  Saga = "saga",
  XionTestnet = "xion-testnet",
  EvmosTestnet = "evmos-testnet",
}

export enum TransferView {
  Form = "form",
  Processing = "processing",
  Success = "success",
}
