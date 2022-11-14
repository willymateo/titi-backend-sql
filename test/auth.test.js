import { jwtSecret } from "../src/config/app.config";
import { Users } from "../src/db/models/users";
import { app } from "../src/app";
import request from "supertest";
import jwt from "jsonwebtoken";
import {
  testUser,
  correctCredentials,
  incorrectCredentials,
  incompleteCredentials,
} from "./mock/auth.mock";

// ==========================================================
// Test hooks
// ==========================================================
beforeAll(async () => {
  try {
    const passwordHash = await Users.encryptPassword(testUser.password);
    await Users.create({ ...testUser, passwordHash });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await Users.destroy({
      where: { username: testUser.username },
      force: true,
    });
  } catch (error) {
    console.log(error);
  }
});

const api = request(app);

// ==========================================================
// Test scenarios
// ==========================================================
describe("Tests with CORRECT credentials", () => {
  let token;
  describe("POST /login", () => {
    test("Should respond with a 200 OK", async () => {
      const res = await api.post("/api/auth/login").send(correctCredentials);

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
  describe("POST /login with incomplete params", () => {
    test("Should respond with a 400 Bad Request", async () => {
      const res = await api.post("/api/auth/login").send(incompleteCredentials);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: "Invalid body schema",
      });
    });
  });

  describe("POST /login with incorrect credentials", () => {
    incorrectCredentials.forEach(credential => {
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
