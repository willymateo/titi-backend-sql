import { jwtSecret } from "../src/config/app.config";
import { Users } from "../src/db/models/users";
import { app } from "../src/app";
import request from "supertest";
import jwt from "jsonwebtoken";

// ==========================================================
// Test hooks
// ==========================================================
beforeAll(async () => {
  const passwordHash = await Users.encryptPassword(testUser.password);
  await Users.create({ ...testUser, passwordHash });
});

afterAll(async () => {
  try {
    await Users.destroy({
      where: { username: testUser.username },
    });
  } catch (err) {
    console.log(err);
  }
});

// ==========================================================
// Test data
// ==========================================================
const api = request(app);
const testUser = {
  username: "test_user",
  password: "test1234",
  firstNames: "User1",
  lastNames: "Test",
  email: "testuser@cathot.com",
};

// ==========================================================
// Test scenarios
// ==========================================================
describe("Tests with CORRECT credentials", () => {
  let token;
  describe("POST /login", () => {
    const credentials = {
      username: testUser.username,
      password: testUser.password,
    };

    test("Should respond with a 200 OK", async () => {
      const res = await api.post("/api/auth/login").send(credentials);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Success authentication");
      expect(res.body).toHaveProperty("token");

      token = res.body.token;
    });

    test("Verify the token integrity", async () => {
      const decodedToken = jwt.verify(token, jwtSecret);
      expect(decodedToken).toHaveProperty("id");
    });
  });
});

describe("Tests with INCORRECT data", () => {
  let credentials = [
    {},
    { username: testUser.username },
    { password: testUser.password },
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
        const res = await api.post("/api/auth/login").send(credential);

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
      password: testUser.password,
    },
    {
      username: testUser.username,
      password: "test1234X",
    },
  ];

  describe("POST /login with incorrect credentials", () => {
    credentials.forEach(credential => {
      test("Should respond with a 401 Unauthorized", async () => {
        const res = await api.post("/api/auth/login").send(credential);

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
          error: `Invalid username or password`,
        });
      });
    });
  });
});
