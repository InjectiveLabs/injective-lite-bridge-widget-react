import {
  sleep,
  HttpRestClient,
  BigNumberInBase,
  splitArrayToChunks,
} from "@injectivelabs/utils";
import { Network, isDevnet, isTestnet } from "@injectivelabs/networks";
import { HttpRequestException } from "@injectivelabs/exceptions";
import {
  CoinGeckoCoin,
  CoinGeckoReturnObject,
  CoinGeckoCoinResponse,
  CoinGeckoMarketChartResponse,
} from "./../types";
import { COINGECKO_KEY, NETWORK } from "./constants";

export class CoinGeckoApiService {
  private httpClient: HttpRestClient;

  private apiKey: string;

  constructor({ apiKey, baseUrl }: { apiKey: string; baseUrl: string }) {
    const headers = {
      "Content-Type": "application/json",
    } as any;

    if (apiKey) {
      headers["X-Cg-Pro-Api-Key"] = apiKey;
    }

    this.apiKey = apiKey;
    this.httpClient = new HttpRestClient(baseUrl, { timeout: 1500 }).setConfig({
      headers,
    });
  }

  async fetchCoin(
    coinId: string,
    options: Record<string, any> | undefined = {}
  ) {
    try {
      const actualParams = {
        localization: false,
        community_data: false,
        tickers: false,
        sparkline: false,
        developer_data: false,
        x_cg_pro_api_key: this.apiKey,
        ...options,
      };

      const { data } = (await this.httpClient.get(
        `/coins/${coinId}`,
        actualParams
      )) as CoinGeckoReturnObject<CoinGeckoCoinResponse>;

      return data;
    } catch (e: unknown) {
      if (e instanceof HttpRequestException) {
        throw e;
      }

      throw new HttpRequestException(new Error((e as any).message));
    }
  }

  async fetchErc20TokenCoinId(
    tokenAddress: string,
    options: Record<string, any> | undefined = {}
  ) {
    try {
      const actualParams = {
        x_cg_pro_api_key: this.apiKey,
        ...options,
      };

      const { data } = (await this.httpClient.get(
        `/coins/ethereum/contract/${tokenAddress}`,
        actualParams
      )) as CoinGeckoReturnObject<CoinGeckoCoinResponse>;

      return data?.id;
    } catch (e: unknown) {
      if (e instanceof HttpRequestException) {
        throw e;
      }

      throw new HttpRequestException(new Error((e as any).message));
    }
  }

  async fetchPrice(
    coinId: string,
    options: Record<string, any> | undefined = {}
  ) {
    try {
      const actualParams = {
        localization: false,
        community_data: false,
        tickers: false,
        sparkline: false,
        developer_data: false,
        x_cg_pro_api_key: this.apiKey,
        ...options,
      };

      const { data } = (await this.httpClient.get(
        `/coins/${coinId}`,
        actualParams
      )) as CoinGeckoReturnObject<CoinGeckoCoinResponse>;

      return data?.market_data?.current_price;
    } catch (e: unknown) {
      if (e instanceof HttpRequestException) {
        throw e;
      }

      throw new HttpRequestException(new Error((e as any).message));
    }
  }

  async fetchUsdPrice(
    coinId: string,
    options: Record<string, any> | undefined = {}
  ) {
    try {
      const actualParams = {
        localization: false,
        community_data: false,
        tickers: false,
        sparkline: false,
        developer_data: false,
        x_cg_pro_api_key: this.apiKey,
        ...options,
      };

      const { data } = (await this.httpClient.get(
        `/coins/${coinId}`,
        actualParams
      )) as CoinGeckoReturnObject<CoinGeckoCoinResponse>;

      return data?.market_data?.current_price?.usd;
    } catch (e: unknown) {
      if (e instanceof HttpRequestException) {
        throw e;
      }

      throw new HttpRequestException(new Error((e as any).message));
    }
  }

  async fetchCoins(params: Record<string, any> | undefined = {}) {
    try {
      const actualParams = {
        include_platform: false,
        x_cg_pro_api_key: this.apiKey,
        ...params,
      };

      return (await this.httpClient.get(
        "/coins/list",
        actualParams
      )) as CoinGeckoReturnObject<CoinGeckoCoin[]>;
    } catch (e: unknown) {
      if (e instanceof HttpRequestException) {
        throw e;
      }

      throw new HttpRequestException(new Error((e as any).message));
    }
  }

  async fetchChart(id: string, params: Record<string, any> | undefined = {}) {
    try {
      const actualParams = {
        ...params,
        x_cg_pro_api_key: this.apiKey,
      };

      const { data } = (await this.httpClient.get(
        `/coins/${id}/market_chart/range`,
        actualParams
      )) as CoinGeckoReturnObject<CoinGeckoMarketChartResponse>;

      return data;
    } catch (e: unknown) {
      if (e instanceof HttpRequestException) {
        throw e;
      }

      throw new HttpRequestException(new Error((e as any).message));
    }
  }

  async fetchHistory(id: string, params: Record<string, any> | undefined = {}) {
    try {
      const actualParams = {
        ...params,
        x_cg_pro_api_key: this.apiKey,
      };

      const { data } = (await this.httpClient.get(
        `/coins/${id}/history`,
        actualParams
      )) as CoinGeckoReturnObject<CoinGeckoCoinResponse>;

      return data;
    } catch (e: unknown) {
      if (e instanceof HttpRequestException) {
        throw e;
      }

      throw new HttpRequestException(new Error((e as any).message));
    }
  }
}

interface TokenStaticWithPrice {
  denom: string;
  coingecko_id: string;
  price: {
    price: number;
    metadata: {
      source: string;
      market_id: string;
      market_price: number;
      height: number;
    };
  };
}

const ASSET_PRICE_SERVICE_URL =
  "https://k8s.mainnet.asset.injective.network/asset-price/v1";
const TESTNET_ASSET_PRICE_SERVICE_URL =
  "https://k8s.testnet.asset.injective.network/asset-price/v1";
const DEVNET_ASSET_PRICE_SERVICE_URL =
  "https://devnet.api.injective.dev/asset-price/v1";

const whiteListedCoinGeckoIds: string[] = [];

const getAssetMicroserviceEndpoint = (network: Network = Network.Mainnet) => {
  if (isTestnet(network)) {
    return TESTNET_ASSET_PRICE_SERVICE_URL;
  }

  if (isDevnet(network)) {
    return DEVNET_ASSET_PRICE_SERVICE_URL;
  }

  return ASSET_PRICE_SERVICE_URL;
};

export class TokenPrice {
  private coinGeckoApi: CoinGeckoApiService | undefined;
  private restClient: HttpRestClient;

  constructor(
    network: Network,
    coinGeckoOptions: {
      baseUrl: string;
      apiKey: string;
    }
  ) {
    this.coinGeckoApi = new CoinGeckoApiService(coinGeckoOptions);
    this.restClient = new HttpRestClient(getAssetMicroserviceEndpoint(network));
  }

  async fetchUsdTokensPrice(coinGeckoIds: string[] = []) {
    const { data } = (await this.restClient.get("denoms?withPrice=true")) as {
      data: Record<string, TokenStaticWithPrice>;
    };

    const tokenPriceMap: Record<string, number> = Object.values(data).reduce(
      (prices, tokenWithPrice) => {
        const id = tokenWithPrice.coingecko_id || tokenWithPrice.denom;

        return { ...prices, [id.toLowerCase()]: tokenWithPrice.price.price };
      },
      {}
    );

    const coinGeckoIdsToFetch = coinGeckoIds.filter(
      (coinGeckoId) => !tokenPriceMap[coinGeckoId]
    );

    if (coinGeckoIdsToFetch.length === 0) {
      return tokenPriceMap;
    }

    const { denomPriceMap, coinGeckoIdList } = coinGeckoIdsToFetch.reduce(
      (lists, coinGeckoId: string) => {
        const isDenomFormat =
          coinGeckoId.startsWith("ibc/") ||
          coinGeckoId.startsWith("peggy") ||
          coinGeckoId.startsWith("share") ||
          coinGeckoId.startsWith("factory/");

        if (isDenomFormat) {
          return {
            ...lists,
            denomPriceMap: { ...lists.denomPriceMap, [coinGeckoId]: 0 },
          };
        }

        return {
          ...lists,
          coinGeckoIdList: [...lists.coinGeckoIdList, coinGeckoId],
        };
      },
      { denomPriceMap: {}, coinGeckoIdList: [] } as {
        denomPriceMap: Record<string, number>;
        coinGeckoIdList: string[];
      }
    );

    const whiteListedCoinGeckoIdsToFetch = coinGeckoIdList.filter(
      (coinGeckoId) => whiteListedCoinGeckoIds.includes(coinGeckoId)
    );

    const coinGeckoIdsPriceMap =
      await this.fetchUsdTokenPriceFromCoinGeckoInChunks(
        whiteListedCoinGeckoIdsToFetch
      );

    const formattedCoinGeckoIdsPriceMap = Object.entries(
      coinGeckoIdsPriceMap
    ).reduce(
      (list, [key, value]) => ({ ...list, [key.toLowerCase()]: value }),
      {} as Record<string, number>
    );

    return {
      ...tokenPriceMap,
      ...formattedCoinGeckoIdsPriceMap,
      ...denomPriceMap,
    };
  }

  private fetchUsdTokenPriceFromCoinGeckoNoThrow = async (coinId: string) => {
    if (!coinId) {
      return 0;
    }

    if (!this.coinGeckoApi) {
      return 0;
    }

    try {
      const priceInUsd = await this.coinGeckoApi.fetchUsdPrice(coinId);

      if (!priceInUsd) {
        return 0;
      }

      return new BigNumberInBase(priceInUsd).toNumber();
    } catch (e: unknown) {
      return 0;
    }
  };

  private fetchUsdTokenPriceFromCoinGeckoInChunks = async (
    coinIds: string[]
  ) => {
    const CHUNK_SIZE = 5;
    const chunks = splitArrayToChunks({
      array: coinIds,
      chunkSize: CHUNK_SIZE,
      filter: (c) => !!c,
    });

    /**
     * We make chunks to ensure that we don't hit the
     * rate limits on CoinGecko by querying multiple
     * prices at the same time as we do multiple
     * calls at the same time
     */
    const response = await Promise.all(
      chunks.map(async (chunk, index) => {
        let prices = {} as Record<string, number>;

        for (let i = 0; i < chunk.length; i += 1) {
          const price = await this.fetchUsdTokenPriceFromCoinGeckoNoThrow(
            chunk[i]
          );

          prices[chunk[i]] = price;
        }

        if (index < chunks.length - 1) {
          await sleep(500);
        }

        return prices;
      })
    );

    const prices = response.reduce((prices, chunkResponse) => {
      return { ...prices, ...chunkResponse };
    }, {});

    return prices;
  };
}

export const tokenPriceService = new TokenPrice(NETWORK, {
  apiKey: COINGECKO_KEY as string,
  baseUrl: COINGECKO_KEY
    ? "https://pro-api.coingecko.com/api/v3"
    : "https://api.coingecko.com/api/v3",
});
