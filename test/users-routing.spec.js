const request = require("supertest");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../db/models/index");
const { Users } = require("../db/models");
const { serverRunning } = require("../bin/www");
const { app } = require("../app");

//==========================================================
//Test data
//==========================================================
const testUsers = [
  {
    username: "connor.mcgregor9",
    password: "cathot2022",
    first_names: "Conor",
    last_names: "McGregor",
    email: "conormcgrego@gmail.com",
    phone: {
      country_code: 593,
      phone_number: "950257102",
    },
    location: {
      latitude: "431431",
      longitude: "43143124",
    },
    profile_information: {
      photo_url: "facebook.com/connormcgregor",
      description: "UFC fighter",
    },
  },
  {
    username: "7mark_zuckerberg",
    password: "cathot2022",
    first_names: "Mark",
    last_names: "Zuckerberg",
    email: "mark.zuckerberg@gmail.com",
    phone: {
      country_code: 593,
      phone_number: "949555555",
    },
    location: {
      latitude: "3196727",
      longitude: "6943923",
    },
    profile_information: {
      photo_url: "facebook.com/markzuckerberg",
      description: "Facebook CEO",
    },
  },
];
//==========================================================

//==========================================================
//Test hooks
//==========================================================
afterAll(async () => {
  await Users.destroy({
    where: {
      username: {
        [Op.or]: [testUsers[0].username, testUsers[1].username],
      },
    },
  });

  db.sequelize.close();
  serverRunning.close();
});
//==========================================================

//==========================================================
//Test scenarios
//==========================================================
describe("Tests with CORRECT data", () => {
  let token;
  describe("POST /users => Create an user", () => {
    testUsers.forEach(testUser => {
      test("Should respond with a 200 OK and the access token", async () => {
        const res = await request(app).post("/api/users").send(testUser);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Success sign up");
        expect(res.body).toHaveProperty("token");

        token = res.body.token;
      });

      test("Verify the token integrity", async () => {
        const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
        expect(decodedToken).toHaveProperty("id");
        expect(decodedToken).toHaveProperty("id_rol");
        expect(decodedToken).toHaveProperty("username", testUser.username);
        expect(decodedToken).toHaveProperty("email", testUser.email);
      });
    });
  });

  describe("GET /users => Get all users info", () => {
    test("Should respond with a 200 OK and a list with all signed up users", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", "Bearer " + token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);

      res.body.forEach(userRes => {
        expect(userRes).toHaveProperty("id");
        expect(userRes).toHaveProperty("username", userRes.username);
        expect(userRes).toHaveProperty("first_names", userRes.first_names);
        expect(userRes).toHaveProperty("last_names", userRes.last_names);
        expect(userRes).toHaveProperty("email", userRes.email);
        expect(userRes.phones).toBeInstanceOf(Array);
        userRes.phones.forEach(phone => {
          expect(phone).toHaveProperty("id");
          expect(phone).toHaveProperty("country_code", phone.country_code);
          expect(phone).toHaveProperty("phone_number", phone.phone_number);
        });
        expect(userRes).toHaveProperty("location.id");
        expect(userRes).toHaveProperty(
          "location.latitude",
          userRes.location.latitude
        );
        expect(userRes).toHaveProperty(
          "location.longitude",
          userRes.location.longitude
        );
        expect(userRes).toHaveProperty("location.is_current", true);
        expect(userRes).toHaveProperty("profile_information.id");
        expect(userRes).toHaveProperty(
          "profile_information.photo_url",
          userRes.profile_information.photo_url
        );
        expect(userRes).toHaveProperty(
          "profile_information.description",
          userRes.profile_information.description
        );
        expect(userRes).toHaveProperty("profile_information.num_later");
        expect(userRes).toHaveProperty("profile_information.num_missing");
        expect(userRes).toHaveProperty("profile_information.user_state.id");
        expect(userRes).toHaveProperty("profile_information.user_state.state");
      });
    });
  });

  describe("GET /users/:username => Get the specific user info", () => {
    testUsers.forEach(testUser => {
      test("Should respond with a 200 OK and the user info", async () => {
        const res = await request(app)
          .get(`/api/users/${testUser.username}`)
          .set("Authorization", "Bearer " + token);

        const userRes = res.body;
        expect(res.statusCode).toBe(200);
        expect(userRes).toHaveProperty("id");
        expect(userRes).toHaveProperty("username", testUser.username);
        expect(userRes).toHaveProperty("first_names", testUser.first_names);
        expect(userRes).toHaveProperty("last_names", testUser.last_names);
        expect(userRes).toHaveProperty("email", testUser.email);
        expect(userRes.phones).toBeInstanceOf(Array);
        userRes.phones.forEach(phone => {
          expect(phone).toHaveProperty("id");
          expect(phone).toHaveProperty(
            "country_code",
            testUser.phone.country_code
          );
          expect(phone).toHaveProperty(
            "phone_number",
            testUser.phone.phone_number
          );
        });
        expect(userRes).toHaveProperty("location.id");
        expect(userRes).toHaveProperty(
          "location.latitude",
          testUser.location.latitude
        );
        expect(userRes).toHaveProperty(
          "location.longitude",
          testUser.location.longitude
        );
        expect(userRes).toHaveProperty("location.is_current", true);
        expect(userRes).toHaveProperty("profile_information.id");
        expect(userRes).toHaveProperty(
          "profile_information.photo_url",
          testUser.profile_information.photo_url
        );
        expect(userRes).toHaveProperty(
          "profile_information.description",
          testUser.profile_information.description
        );
        expect(userRes).toHaveProperty("profile_information.num_later");
        expect(userRes).toHaveProperty("profile_information.num_missing");
        expect(userRes).toHaveProperty("profile_information.user_state.id");
        expect(userRes).toHaveProperty("profile_information.user_state.state");
      });
    });
  });
});
//==========================================================
