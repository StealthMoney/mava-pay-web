import { AccountStatus, AccountTypes, paymentMethod } from "@/config/default";

export type AccountType = (typeof AccountTypes)[keyof typeof AccountTypes];
export type AccountStatusType =
  (typeof AccountStatus)[keyof typeof AccountStatus];

export type PaymentMethodType =
  (typeof paymentMethod)[keyof typeof paymentMethod];
