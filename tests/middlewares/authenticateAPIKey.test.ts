import request from "supertest";
import { Express } from "express";
import { createServer } from "../../api";
import { authenticateAPIKey } from "../../api/middleware/auth";

describe("authenticateAPIKey", () => {
  let app: Express;
  beforeEach(async () => {
    app = await createServer({
      middlewares: [authenticateAPIKey],
      // by default the server handles the not found route, we don't want that for this test
      handlesNotFound: false,
    });
    app.use(authenticateAPIKey);

    app.post("/api/v1/test-endpoint", (req, res) => {
      res.status(200).json({ message: "OK" });
    });
  });

  test("should return 401 if no authorization provided", async () => {
    const response = await request(app).post("/api/v1/test-endpoint").send({});
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  test("should return 401 if authorization is wrong", async () => {
    const response = await request(app).post("/api/v1/test-endpoint").set("x-api-key", "wrong-api-key").send({});
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  test("should continue with the request if authorization is ok", async () => {
    const response = await request(app)
      .post("/api/v1/test-endpoint")
      // the value of the api key is set in tests/setup.ts
      .set("x-api-key", "test-api-key")
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "OK",
    });
  });
});
