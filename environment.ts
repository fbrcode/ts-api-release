import dotenv from "dotenv";

dotenv.config();

export const PRIVATE_ENVIRONMENT = {
  ENVIRONMENT: process.env.ENVIRONMENT as string,
  APP_API_KEY: process.env.APP_API_KEY as string,
};
