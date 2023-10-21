export type Wallet = {
  id: string;
  currency: WalletCurrencyType;
  balance: number;
  transactions: any[];
}

export const WalletCurrency = {
  Ngn: "NGN",
  Usd: "USD",
  Btc: "BTC"
} as const

export type WalletCurrencyType = (typeof WalletCurrency)[keyof typeof WalletCurrency]

