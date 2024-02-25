import request from "supertest";
import { Express } from "express";
import { createServer } from "../../api/index";

describe("Application Tests", () => {
  let app: Express;

  beforeEach(async () => {
    app = await createServer();
  });

  describe("Get items endpoint tests", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return the expected response if all is ok", async () => {
      const responseData = { item: "777", extra: "999" };
      const response = await request(app).get("/api/v1/module/777?extra=999").send({});
      expect(response.status).toBe(200);
      expect(response.body).toEqual(responseData);
    });
  });
});
