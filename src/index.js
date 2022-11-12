import expressListRoutes from "express-list-routes";
import { initialSetup } from "./libs/initialSetup";
import { app } from "./app";
import "dotenv/config";

const port = process.env.PORT || 0;
const server = app.listen(port, async () => {
  try {
    console.log("Checking for initial setup...");
    await initialSetup();
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
