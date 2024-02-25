import { Request, Response, NextFunction } from "express";
import { PRIVATE_ENVIRONMENT } from "../../environment";
import Logger from "../utils/logger";

export const authenticateAPIKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appApiKey = PRIVATE_ENVIRONMENT.APP_API_KEY;

    if (!appApiKey) {
      Logger.error("Application API key not defined. Unable to proceed");
      return res.status(500).json({ message: "Application API key not defined. Unable to proceed" });
    }

    let token;
    if (req.method === "POST") {
      token = req.headers["x-api-key"];
    } else if (req.method === "GET") {
      token = req.get("x-api-key");
    }

    const validationRes = token === appApiKey;

    if (!validationRes) {
      Logger.error(`Unauthorized access on ${req.method} ${req.baseUrl}${req.url}`);
      return res.status(401).json({ message: "Unauthorized" });
    }

    return next();
  } catch (error) {
    Logger.error(`Error authenticating user: ${error}`);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
