const request = require("supertest");
const app = require("../app.js");
const server = require("../listen.js");
const seed = require("../db/seeds/seed.js");
const pool = require("../db/pool.js");

beforeEach(() => {
  return seed().catch((err) => {
    console.error(err, "this is before each block");
  });
});

afterAll(() => {
  return pool.end().then(() => {
    new Promise((resolve) => {
      server.close(resolve);
    });
  });
});

describe.only("User Login", () => {
  test("200, user has typed in the right username and password", () => {
    return request(app)
      .post("/login")
      .send({ username: "nathan101", password: "pizza" })
      .expect(200)
      .then((res) => {
        expect(res.body.text).toBe("User Login Successful");
      });
  });
  test("404, Username Not Found", () => {
    return request(app)
      .post("/login")
      .send({ username: "nathan", password: "pizza" })
      .expect(404)
      .then((res) => {
        expect(res.body.error).toBe("Username Not Found");
      });
  });
  test("401, Incorrect Password", () => {
    return request(app)
      .post("/login")
      .send({ username: "nathan101", password: "pizza10000" })
      .expect(401)
      .then((res) => {
        expect(res.body.error).toBe("Incorrect Password");
      });
  });
  test("400, Bad Request : response object does not contain the right keys", () => {
    return request(app)
      .post("/login")
      .send({ user101: "nathan101", password: "pizza" })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toBe("Bad Request");
      });
  });
});


