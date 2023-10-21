import { AccountTypes } from "@/config/default";
import { AccountStatusType, AccountType } from "../../types";
import { Wallet } from "./wallet";

export type Profile = {
  id: string;
  name: string;
  businessname?: string;
  email: string;
  phone: string;
  account: Account;
}

export type Account = {
  id: string;
  type: AccountType;
  status: AccountStatusType;
  apiKey?: string;
  ownerId: string;
  webhooks: Webhook[];
  walletDetails: Wallet[];
}

export type Webhook = any