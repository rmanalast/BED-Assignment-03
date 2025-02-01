import express, { Express } from "express";
import morgan from "morgan"; // Import Morgan

// Import the item routes from the new routes file
import itemRoutes from "./api/v1/routes/itemRoutes";

const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Route handler for items
app.use("/api/v1", itemRoutes);

// Export the app
export default app;
