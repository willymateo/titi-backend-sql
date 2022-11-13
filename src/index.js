import { nodeEnvironment, port } from "./config/app.config";
import expressListRoutes from "express-list-routes";
import { initialSetup } from "./libs/initialSetup";
import { app } from "./app";

const server = app.listen(port, async () => {
  try {
    console.log("Checking for initial setup...");
    await initialSetup();
    console.log("Initial setup complete");

    if (nodeEnvironment === "development") {
      console.log("Available routes:");
      expressListRoutes(app);
    }

    console.log(`Environment: ${nodeEnvironment}`);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});

export { server };
