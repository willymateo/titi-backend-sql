const UUIDV4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const testUsers = [
  {
    username: "connor.mcgregor9",
    password: "titi2022",
    firstNames: "Conor",
    lastNames: "McGregor",
    email: "conormcgrego@gmail.com",
    photoUrl: "https://facebook.com/connor.mcgregor",
    biography: "UFC fighter",
    bornDate: "2000-07-29T23:05:07.832Z",
    idGender: 2,
    phone: {
      countryCode: 593,
      phoneNumber: "950257102",
    },
    location: {
      latitude: "431431",
      longitude: "43143124",
    },
  },
  {
    username: "7mark_zuckerberg",
    password: "titi2022",
    firstNames: "Mark",
    lastNames: "Zuckerberg",
    email: "mark.zuckerberg@gmail.com",
    photoUrl: "https://facebook.com/markzuckerberg",
    biography: "Facebook CEO",
    bornDate: "2000-07-29T23:05:07.832Z",
    idGender: 1,
    phone: {
      countryCode: 593,
      phoneNumber: "949555555",
    },
    location: {
      latitude: "3196727",
      longitude: "6943923",
    },
  },
];

const userMatch = {
  id: expect.stringMatching(UUIDV4_REGEX),
  username: expect.any(String),
  firstNames: expect.any(String),
  lastNames: expect.any(String),
  email: expect.any(String),
  photoUrl: expect.any(String),
  bornDate: expect.any(String),
  biography: expect.any(String),
  numLater: expect.any(Number),
  numMissing: expect.any(Number),
  currentState: {
    id: 1,
    state: expect.any(String),
  },
  gender: {
    id: expect.any(Number),
    gender: expect.any(String),
  },
  phone: {
    id: expect.stringMatching(UUIDV4_REGEX),
    countryCode: expect.any(Number),
    phoneNumber: expect.any(String),
  },
  location: {
    id: expect.stringMatching(UUIDV4_REGEX),
    latitude: expect.any(String),
    longitude: expect.any(String),
  },
};

export { testUsers, userMatch };
