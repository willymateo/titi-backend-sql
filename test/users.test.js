import { testUsers, userMatch } from "./mock/users.mock";
import { jwtSecret } from "../src/config/app.config";
import { Users } from "../src/db/models/users";
import { app } from "../src/app";
import request from "supertest";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

// ==========================================================
// Test hooks
// ==========================================================
afterAll(async () => {
  try {
    await Users.destroy({
      where: {
        username: {
          [Op.or]: [testUsers[0].username, testUsers[1].username],
        },
      },
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
describe("Tests with CORRECT data", () => {
  let token;
  describe("POST /users => Create an user", () => {
    testUsers.forEach(testUser => {
      test("Should respond with a 200 OK and the access token", async () => {
        const res = await api.post("/api/users").send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "Success sign up");
        expect(res.body).toHaveProperty("token");

        token = res.body.token;
      });

      test("Verify the token integrity", () => {
        const decodedToken = jwt.verify(token, jwtSecret);
        expect(decodedToken).toHaveProperty("id");
      });
    });
  });

  describe("GET /users => Get all users info", () => {
    test("Should respond with a 200 OK and a list with all signed up users", async () => {
      const res = await api.get("/api/users").set("Authorization", "Bearer " + token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);

      res.body.forEach(userRes => {
        expect(userRes).toMatchObject(userMatch);
      });
    });
  });

  describe("GET /users/:username => Get the specific user info", () => {
    testUsers.forEach((testUser, index) => {
      test("Should respond with a 200 OK and the user info", async () => {
        const res = await api
          .get(`/api/users/${testUser.username}`)
          .set("Authorization", "Bearer " + token);

        const userRes = res.body;
        expect(res.statusCode).toBe(200);
        expect(userRes).toHaveProperty("id");
        expect(userRes).toHaveProperty("username", testUser.username);
        expect(userRes).toHaveProperty("firstNames", testUser.firstNames);
        expect(userRes).toHaveProperty("lastNames", testUser.lastNames);
        expect(userRes).toHaveProperty("email", testUser.email);
        expect(userRes).toHaveProperty("photoUrl", testUser.photoUrl);
        expect(userRes).toHaveProperty("biography", testUser.biography);
        expect(userRes).toHaveProperty("numLater");
        expect(userRes).toHaveProperty("numMissing");
        expect(userRes).toHaveProperty("currentState.id");
        expect(userRes).toHaveProperty("currentState.state");
        expect(userRes).toHaveProperty("location.id");
        expect(userRes).toHaveProperty("location.latitude", testUser.location.latitude);
        expect(userRes).toHaveProperty("location.longitude", testUser.location.longitude);
      });
    });
  });
});
