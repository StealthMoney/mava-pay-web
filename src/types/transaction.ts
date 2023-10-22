import { WalletCurrencyType } from "./wallet";

export type Transaction = {
  id: string;
  ref?: string;
  hash?: string;
  amount: number;
  fees: number;
  currency: WalletCurrencyType;
  type: TransactionType;
  status: TransactionStatus;
};

export type TransactionType = "DEPOSIT" | "WITHDRAWAL";

export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
