import {
  BigNumber,
  BigNumberInWei,
  BigNumberInBase,
} from "@injectivelabs/utils";

export const INJ_LOGO_URL =
  "https://imagedelivery.net/DYKOWp0iCc0sIkF-2e4dNw/c7b97294-890e-459c-4673-1ca1dea64f00/public";
export const INJ_LOGO_DARK_URL =
  "https://imagedelivery.net/DYKOWp0iCc0sIkF-2e4dNw/8493baf6-e4d3-4ac6-5a3b-afe15b47ae00/public";
export const USDT_LOGO_URL =
  "https://imagedelivery.net/DYKOWp0iCc0sIkF-2e4dNw/2d38ee9a-2df1-4dd0-155b-11404014bc00/public";
export const UNKNOWN_LOGO_URL =
  "https://imagedelivery.net/DYKOWp0iCc0sIkF-2e4dNw/1fb4f29a-9aed-4349-4e0b-0db6b28e7500/public";

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
