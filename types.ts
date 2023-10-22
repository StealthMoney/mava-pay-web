import { AccountStatus, AccountTypes } from "@/config/default";

export type AccountType = (typeof AccountTypes)[keyof typeof AccountTypes];
export type AccountStatusType =
  (typeof AccountStatus)[keyof typeof AccountStatus];
