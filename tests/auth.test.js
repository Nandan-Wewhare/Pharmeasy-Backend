const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const correctUser = require("../tests/mock-data/correct-user.json");
const incorrectUser = require("../tests/mock-data/incorrect-user.json");
const authController = require("../controllers/auth.controller");
require("dotenv/config");

let req, res;

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Successful login", () => {
  beforeEach(() => {
    req = httpMocks.createRequest({
      method: "POST",
      url: "/auth/login",
      body: correctUser,
    });

    res = httpMocks.createResponse();
  });

  it("should login successfully", async () => {
    await authController.login(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("Unsuccessful login", () => {
  beforeEach(() => {
    req = httpMocks.createRequest({
      method: "POST",
      url: "/auth/login",
      body: incorrectUser,
    });

    res = httpMocks.createResponse();
  });

  it("should not login successfully", async () => {
    await authController.login(req, res);
    expect(res.statusCode).toBe(400);
  });
});
