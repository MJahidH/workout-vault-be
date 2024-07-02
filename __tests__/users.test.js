const request = require("supertest");
const app = require("../app.js");
const server = require("../listen.js");
const seed = require("../db/seeds/seed.js");
const pool = require("../db/pool.js")

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

describe.only("User Log In",() => {
    test("200, user has typed in the right username and password", () => {
        return request(app)
        .post("/login")
        .expect(200)
        .then((res) => {
            console.log(res.text)
        })
    })
})
