import { createUserRoles, createUserStates, createAdventureStates } from "./libs/initialSetup";
import { testConnection, syncModels } from "./database";
import expressListRoutes from "express-list-routes";
import { app } from "./app";
import "dotenv/config";

// Load models
import "./models/engagedUsersAdventures";
import "./models/profileInformation";
import "./models/adventureStates";
import "./models/islandMembers";
import "./models/adventures";
import "./models/userStates";
import "./models/locations";
import "./models/userRoles";
import "./models/islands";
import "./models/phones";
import "./models/users";

const initDatabase = async () => {
  try {
    await testConnection();
    await syncModels();
    await createUserRoles();
    await createUserStates();
    await createAdventureStates();
  } catch (error) {
    console.log(error);
  }
};
initDatabase();

const port = process.env.PORT || "3000";
const server = app.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    console.log("\nAvailable routes:");
    expressListRoutes(app);
  }
  console.log(`Server is running on port ${port}`);
});

export { server };
