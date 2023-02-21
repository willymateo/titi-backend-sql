const testUser = {
  username: "test_user",
  password: "test1234",
  firstNames: "User1",
  lastNames: "Test",
  email: "testuser@titi.com",
  photoUrl: "https://facebook.com/testuser",
  biography: "Test User",
  bornDate: "2000-07-29",
  idGender: 2,
};

const correctCredentials = {
  username: testUser.username,
  password: testUser.password,
};

const incompleteCredentials = {
  username: testUser.username,
};

const incorrectCredentials = [
  {
    username: "test_userX",
    password: testUser.password,
  },
  {
    username: testUser.username,
    password: "test1234X",
  },
];

export { testUser, correctCredentials, incorrectCredentials, incompleteCredentials };
