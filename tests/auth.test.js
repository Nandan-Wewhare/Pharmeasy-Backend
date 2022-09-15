const mongoose = require("mongoose");
const mongoMemoryServer = require("mongodb-memory-server");
const httpMocks = require("node-mocks-http");
const correctUser = require("../tests/mock-data/auth/correct-user.json");
const incorrectUser = require("../tests/mock-data/auth/incorrect-user.json");
const authController = require("../controllers/auth.controller");

let mongoServer;
let req, res;

beforeAll(async () => {
  // using local mongoServer for testing to prevent unnecessary R/W to MongoDB Cloud
  mongoServer = await mongoMemoryServer.MongoMemoryServer.create();
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Register", () => {
  req = httpMocks.createRequest({
    method: "POST",
    url: "/auth/register",
    body: correctUser,
  });

  res = httpMocks.createResponse();

  test("Success", async () => {
    await authController.register(req, res);

    expect(res.statusCode).toBe(201);
  });
});

describe("Login", () => {
  test("Success", async () => {
    req = httpMocks.createRequest({
      method: "POST",
      url: "/auth/login",
      body: correctUser,
    });

    res = httpMocks.createResponse();
    await authController.login(req, res);
    expect(res.statusCode).toBe(200);
  });

  test("Failure", async () => {
    req = httpMocks.createRequest({
      method: "POST",
      url: "/auth/login",
      body: incorrectUser,
    });

    res = httpMocks.createResponse();
    await authController.login(req, res);
    expect(res.statusCode).toBe(400);
  });
});
