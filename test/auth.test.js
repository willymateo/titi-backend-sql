import { Users } from "../src/models/users";
import { sequelize } from "../src/database";
import { server } from "../src/index";
import { app } from "../src/app";
import request from "supertest";
import jwt from "jsonwebtoken";

// ==========================================================
// Test data
// ==========================================================
const testUser = {
  username: "test_user",
  passwordHash: "test1234",
  firstNames: "User1",
  lastNames: "Test",
  email: "testuser@cathot.com",
};
// ==========================================================

// ==========================================================
// Test hooks
// ==========================================================
beforeAll(async () => {
  await Users.create(testUser);
});

afterAll(async () => {
  await Users.destroy({
    where: { username: testUser.username },
  });

  sequelize.close();
  server.close();
});
// ==========================================================

// ==========================================================
// Test scenarios
// ==========================================================
describe("Tests with CORRECT credentials", () => {
  describe("POST /login", () => {
    const credentials = {
      username: testUser.username,
      password: testUser.passwordHash,
    };

    let token;

    test("Should respond with a 200 OK", async () => {
      const res = await request(app).post("/api/auth/login").send(credentials);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Success authentication");
      expect(res.body).toHaveProperty("token");

      token = res.body.token;
    });

    test("Verify the token integrity", async () => {
      const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
      expect(decodedToken).toHaveProperty("id");
    });
  });
});

describe("Tests with INCORRECT data", () => {
  let credentials = [
    {},
    { username: testUser.username },
    { password: testUser.passwordHash },
    {
      username: null,
      password: null,
    },
    {
      username: NaN,
      password: NaN,
    },
    {
      username: "",
      password: "",
    },
  ];

  credentials.forEach(credential => {
    describe("POST /login with incomplete params", () => {
      test("Should respond with a 400 Bad Request", async () => {
        const res = await request(app).post("/api/auth/login").send(credential);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
          error: "Incomplete credentials. Should receive 'username' and 'password' params",
        });
      });
    });
  });

  credentials = [
    {
      username: "test_userX",
      password: testUser.passwordHash,
    },
    {
      username: testUser.username,
      password: "test1234X",
    },
  ];

  credentials.forEach(credential => {
    describe("POST /login with incorrect credentials", () => {
      test("Should respond with a 401 Unauthorized", async () => {
        const res = await request(app).post("/api/auth/login").send(credential);

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
          error: `Invalid username or password`,
        });
      });
    });
  });
});
// ==========================================================
