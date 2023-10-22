import { config } from "dotenv";
import { ConfigError } from "./errors";

config();

export const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_APP_PUBLIC_API_BASE_URL;
export const isProd = process.env.NODE_ENV === "production";
export const isDev = process.env.NODE_ENV === "development";

if (!API_BASE_URL) {
  throw new ConfigError("API_BASE_URL not found");
}
