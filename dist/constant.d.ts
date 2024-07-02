import { Config, TokenMetadata } from './types';
export declare const FEE_DIVISOR = 10000;
export declare const STABLE_LP_TOKEN_DECIMALS = 18;
export declare const RATED_POOL_LP_TOKEN_DECIMALS = 24;
export declare const STORAGE_TO_REGISTER_WITH_MFT = "0.1";
export declare const ONE_YOCTO_NEAR = "0.000000000000000000000001";
export declare function getConfig(env?: string | undefined, indexerUrl?: string | undefined, custom_config?: Config | undefined): Config;
export declare let config: Config;
export declare let REF_FI_CONTRACT_ID: string;
export declare let WRAP_NEAR_CONTRACT_ID: string;
export declare let REF_TOKEN_ID: string;
export declare let WNEAR_META_DATA: TokenMetadata;
export declare let REF_META_DATA: {
    decimals: number;
    icon: string;
    id: string;
    name: string;
    symbol: string;
};
export declare const NEAR_META_DATA: TokenMetadata;
export declare const TokenLinks: Record<string, string>;
export declare const CONSTANT_D = 1.0001;
export declare const POINTLEFTRANGE = -800000;
export declare const POINTRIGHTRANGE = 800000;
export declare const switchEnv: () => {
    config: Config;
    REF_FI_CONTRACT_ID: string;
    WRAP_NEAR_CONTRACT_ID: string;
    REF_TOKEN_ID: string;
    REF_META_DATA: {
        decimals: number;
        icon: string;
        id: string;
        name: string;
        symbol: string;
    };
    WNEAR_META_DATA: TokenMetadata;
};