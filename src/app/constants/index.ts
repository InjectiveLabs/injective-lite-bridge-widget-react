import {
  BigNumber,
  BigNumberInWei,
  BigNumberInBase,
} from "@injectivelabs/utils";

export const INJ_LOGO_URL =
  "https://imagedelivery.net/lPzngbR8EltRfBOi_WYaXw/efaa2c96-5463-4707-0d2b-19e5b63df000/public";
export const INJ_LOGO_DARK_URL =
  "https://imagedelivery.net/lPzngbR8EltRfBOi_WYaXw/efaa2c96-5463-4707-0d2b-19e5b63df000/public";
export const USDT_LOGO_URL =
  "https://imagedelivery.net/lPzngbR8EltRfBOi_WYaXw/a0bd252b-1005-47ef-d209-7c1c4a3cbf00/public";
export const AUSD_LOGO_URL =
  "https://imagedelivery.net/lPzngbR8EltRfBOi_WYaXw/4b446611-8af6-424f-abc6-e41defe1d800/public";
export const UNKNOWN_LOGO_URL =
  "https://imagedelivery.net/lPzngbR8EltRfBOi_WYaXw/6f015260-c589-499f-b692-a57964af9900/public";

export const INJ_DENOM = "inj";
export const ETH_DENOM = "peggy0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const USDT_DENOM = "peggy0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const BINANCE_DEPOSIT_ADDRESS =
  "inj1u2rajhqtptzvu23leheta9yg99k3hazf4waf43";

export const ZERO_IN_WEI: BigNumberInWei = new BigNumberInWei(0);
export const ZERO_IN_BASE: BigNumberInBase = new BigNumberInBase(0);
export const NUMBER_REGEX = new RegExp(/^-?(0|[1-9]\d*)?(\.\d+)?$/);

export const GWEI_IN_WEI: BigNumber = new BigNumber(1000000000);
export const DEFAULT_GAS_PRICE = new BigNumber(120).times(GWEI_IN_WEI);
export const DEFAULT_MAINNET_GAS_PRICE = new BigNumber(30).times(GWEI_IN_WEI);
export const INJ_REQUIRED_FOR_GAS = 0.005;
export const TX_DEFAULTS_GAS = 80_000_000;

export const UTC_TIMEZONE = "Etc/Greenwich";

export const PEGGY_TRANSFER_DEFAULT_GAS_LIMIT = 100000;
export const ALLOWANCE_DEFAULT_GAS_LIMIT = 45000;

export const TIP_IN_GWEI: BigNumberInBase = new BigNumberInBase(2).times(
  GWEI_IN_WEI
);
export const TIP_IN_GWEI_TESTNET: BigNumberInBase = new BigNumberInBase(
  1.5
).times(GWEI_IN_WEI);
export const GAS_LIMIT_MULTIPLIER = 1.2;

export const UNLIMITED_ALLOWANCE: BigNumber = new BigNumber(2)
  .pow(256)
  .minus(1);

export * from "./setup";
