import { createUserRoles, createUserStates, createAdventureStates } from "./libs/initialSetup";
import { testConnection, syncModels } from "./db/connection";
import expressListRoutes from "express-list-routes";
import { app } from "./app";
import "dotenv/config";

const port = process.env.PORT || "3000";
const server = app.listen(port, async () => {
  await testConnection();
  try {
    if (process.env.NODE_ENV === "development") {
      await syncModels();
      console.log("\nAvailable routes:");
      expressListRoutes(app);
    }
  } catch (error) {
    console.log(error);
  }

  if (process.env.NODE_ENV !== "test") {
    await createUserRoles();
    await createUserStates();
    await createAdventureStates();
  }
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Server is running on port ${port}`);
});

export { server };
