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
  // try {
  //   await Users.destroy({
  //     where: {
  //       username: {
  //         [Op.or]: [testUsers[0].username, testUsers[1].username],
  //       },
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
});

// ==========================================================
// Test data
// ==========================================================
const api = request(app);
const testUsers = [
  {
    username: "connor.mcgregor9",
    password: "cathot2022",
    firstNames: "Conor",
    lastNames: "McGregor",
    email: "conormcgrego@gmail.com",
    phone: {
      countryCode: 593,
      phoneNumber: "950257102",
    },
    location: {
      latitude: "431431",
      longitude: "43143124",
    },
    profileInformation: {
      photoUrl: "facebook.com/connormcgregor",
      biography: "UFC fighter",
    },
  },
  {
    username: "7mark_zuckerberg",
    password: "cathot2022",
    firstNames: "Mark",
    lastNames: "Zuckerberg",
    email: "mark.zuckerberg@gmail.com",
    phone: {
      countryCode: 593,
      phoneNumber: "949555555",
    },
    location: {
      latitude: "3196727",
      longitude: "6943923",
    },
    profileInformation: {
      photoUrl: "facebook.com/markzuckerberg",
      biography: "Facebook CEO",
    },
  },
];

// ==========================================================
// Test scenarios
// ==========================================================
describe("Tests with CORRECT data", () => {
  let token;
  describe("POST /users => Create an user", () => {
    testUsers.forEach(testUser => {
      test("Should respond with a 200 OK and the access token", async () => {
        const res = await api.post("/api/users").send(testUser);

        expect(res.statusCode).toBe(200);
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
        expect(userRes).toHaveProperty("id");
        expect(userRes).toHaveProperty("username", userRes.username);
        expect(userRes).toHaveProperty("firstNames", userRes.firstNames);
        expect(userRes).toHaveProperty("lastNames", userRes.lastNames);
        expect(userRes).toHaveProperty("email", userRes.email);
        expect(userRes.phones).toBeInstanceOf(Array);
        userRes.phones.forEach(phone => {
          expect(phone).toHaveProperty("id");
          expect(phone).toHaveProperty("countryCode", phone.countryCode);
          expect(phone).toHaveProperty("phoneNumber", phone.phoneNumber);
        });
        expect(userRes).toHaveProperty("location.id");
        expect(userRes).toHaveProperty("location.latitude", userRes.location.latitude);
        expect(userRes).toHaveProperty("location.longitude", userRes.location.longitude);
        expect(userRes).toHaveProperty("location.isCurrent", true);
        expect(userRes).toHaveProperty("profileInformation.id");
        expect(userRes).toHaveProperty(
          "profileInformation.photoUrl",
          userRes.profileInformation.photoUrl
        );
        expect(userRes).toHaveProperty(
          "profileInformation.biography",
          userRes.profileInformation.biography
        );
        expect(userRes).toHaveProperty("profileInformation.numLater");
        expect(userRes).toHaveProperty("profileInformation.numMissing");
        expect(userRes).toHaveProperty("profileInformation.userState.id");
        expect(userRes).toHaveProperty("profileInformation.userState.state");
      });
    });
  });

  describe("GET /users/:username => Get the specific user info", () => {
    testUsers.forEach(testUser => {
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
        expect(userRes.phones).toBeInstanceOf(Array);

        userRes.phones.forEach(phone => {
          expect(phone).toHaveProperty("id");
          expect(phone).toHaveProperty("countryCode", testUser.phone.countryCode);
          expect(phone).toHaveProperty("phoneNumber", testUser.phone.phoneNumber);
        });

        expect(userRes).toHaveProperty("location.id");
        expect(userRes).toHaveProperty("location.latitude", testUser.location.latitude);
        expect(userRes).toHaveProperty("location.longitude", testUser.location.longitude);
        expect(userRes).toHaveProperty("location.isCurrent", true);
        expect(userRes).toHaveProperty("profileInformation.id");
        expect(userRes).toHaveProperty(
          "profileInformation.photoUrl",
          testUser.profileInformation.photoUrl
        );
        expect(userRes).toHaveProperty(
          "profileInformation.biography",
          testUser.profileInformation.biography
        );
        expect(userRes).toHaveProperty("profileInformation.numLater");
        expect(userRes).toHaveProperty("profileInformation.numMissing");
        expect(userRes).toHaveProperty("profileInformation.userState.id");
        expect(userRes).toHaveProperty("profileInformation.userState.state");
      });
    });
  });
});
