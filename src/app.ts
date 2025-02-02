import express, { Express } from "express";
import morgan from "morgan"; // Import Morgan

// Import the item routes from the new routes file
import itemRoutes from "./api/v1/routes/itemRoutes";
import setupSwagger from "../config/swagger"; // Import Swagger setup

const app: Express = express();

// Setup Swagger
setupSwagger(app);

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Route handler for items
app.use("/api/v1", itemRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).send("Server is healthy");
});

// Export the app
export default app;
