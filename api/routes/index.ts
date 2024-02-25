import { Router } from "express";
import { getInfo } from "../controllers/get-items";
import { getAppVersion } from "../utils/file";

const routes = Router();

// get authenticated status
// curl -X GET -H "x-api-key: 123" "http://localhost:3333/api/v1/health"
routes.get("/v1/health", (req, res) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.status(200).json({ status: "ok", version: getAppVersion() });
});

// curl -X GET -H "x-api-key: 123" "http://localhost:3333/api/v1/module/777?extra=999"
routes.get("/v1/module/:item", getInfo);

export default routes;
