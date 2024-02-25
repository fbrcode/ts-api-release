import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import Logger from "./utils/logger";
import { getEnvironment } from "./utils/env";
import { getAppVersion } from "./utils/file";
import { authenticateAPIKey } from "./middleware/auth";

const app: Express = express();
const { NODE_ENV } = process.env;

export const createServer = async ({
  middlewares,
  handlesNotFound = true,
}: {
  middlewares?: Array<(req: any, res: any, next: any) => void>;
  handlesNotFound?: boolean;
} = {}) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // get unauthenticated status
  // curl -X GET "http://localhost:3333/health"
  app.get("/health", (req, res) => {
    if (getEnvironment() === "development") Logger.debug("Health check: OK");
    res.status(200).json({ status: "ok", version: getAppVersion() });
  });

  app.use("/api", ...(middlewares || []), routes);

  // this will handle all the requests that are not handled by the routes
  if (handlesNotFound) {
    app.all("*", (req, res) => {
      res.status(404).json({ error: `Not Found ${req.method} ${req.url}` });
    });
  }

  return app;
};

if (NODE_ENV !== "test") {
  const host_port = process.env.HOST_PORT || 3333;
  createServer({
    middlewares: [authenticateAPIKey],
  }).then((app) => {
    app.listen(host_port, () => {
      Logger.info(`api:start :: Serving on port ${host_port}`);
    });
  });
}

export default app;
