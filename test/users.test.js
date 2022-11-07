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
  } catch (err) {
    console.log(err);
  }
});

// ==========================================================
// Test data
// ==========================================================
const api = request(app);
const testUsers = [
  {
    username: "connor.mcgregor9",
    password: "titi2022",
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
      bornDate: "2000-09-02",
      idGender: 2,
    },
  },
  {
    username: "7mark_zuckerberg",
    password: "titi2022",
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
      bornDate: "2004-07-31",
      idGender: 1,
    },
  },
];

const uuidv4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const userMatch = {
  id: expect.stringMatching(uuidv4Regex),
  username: expect.any(String),
  firstNames: expect.any(String),
  lastNames: expect.any(String),
  email: expect.any(String),
  phone: {
    id: expect.stringMatching(uuidv4Regex),
    countryCode: expect.any(Number),
    phoneNumber: expect.any(String),
  },
  location: {
    id: expect.stringMatching(uuidv4Regex),
    latitude: expect.any(String),
    longitude: expect.any(String),
  },
  profileInformation: {
    id: expect.stringMatching(uuidv4Regex),
    currentState: {
      id: 1,
      state: expect.any(String),
    },
    gender: {
      id: expect.any(Number),
      gender: expect.any(String),
    },
    photoUrl: expect.any(String),
    bornDate: expect.any(String),
    biography: expect.any(String),
    numLater: expect.any(Number),
    numMissing: expect.any(Number),
  },
};

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
        expect(userRes.phone).toHaveProperty("id");
        expect(userRes.phone).toHaveProperty("countryCode");
        expect(userRes.phone).toHaveProperty("phoneNumber");
        expect(userRes).toHaveProperty("location.id");
        expect(userRes).toHaveProperty("location.latitude", testUser.location.latitude);
        expect(userRes).toHaveProperty("location.longitude", testUser.location.longitude);
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
        expect(userRes).toHaveProperty("profileInformation.currentState.id");
        expect(userRes).toHaveProperty("profileInformation.currentState.state");
      });
    });
  });
});
