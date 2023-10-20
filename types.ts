import { AccountTypes } from "@/config/default";

export type AccountType = (typeof AccountTypes)[keyof typeof AccountTypes]

