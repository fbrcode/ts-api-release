import { Request, RequestHandler, Response } from "express";
import Logger from "../utils/logger";

export const getInfo: RequestHandler = async (req: Request, res: Response) => {
  Logger.info(`${req.method} ${req.baseUrl}${req.url}`);
  res.setHeader("Content-Type", "application/json");

  const { item } = req.params;
  const extra = req.query.extra;

  try {
    // Call some functions to get data here
    return res.status(200).json({ item, extra });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
