import { createUserRoles, createUserStates, createAdventureStates } from "./libs/initialSetup";
import expressListRoutes from "express-list-routes";
import { sequelize } from "./db/connection";
import { app } from "./app";
import "dotenv/config";

const port = process.env.PORT || 0;
const server = app.listen(port, async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("Syncing models...");
      await sequelize.sync({ force: true });
      console.log("All models were synchronized successfully.");
    }

    console.log("Checking for initial setup...");
    await Promise.all([createUserRoles(), createUserStates(), createAdventureStates()]);
    console.log("Initial setup complete");

    if (process.env.NODE_ENV === "development") {
      console.log("Available routes:");
      expressListRoutes(app);
    }

    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});

export { server };
