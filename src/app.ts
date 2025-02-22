import express, { Express } from "express";
import morgan from "morgan"; // Import Morgan
import errorHandler from "./api/v1/middleware/errorHandler" // Import Error Handler

import employeeRoutes from './api/v1/routes/employeeRoutes'; // Import Employee Routes
import branchRoutes from './api/v1/routes/branchRoutes'; // Import Branch Routes

import setupSwagger from "../config/swagger"; // Import Swagger setup

const app: Express = express();

// Setup Swagger
setupSwagger(app);

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Parses JSON data in requests
app.use(express.json());

// Route handler for employees
app.use("/api/v1/employees", employeeRoutes);

// Route handler for Branch
app.use("/api/v1/branches", branchRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).send("Server is healthy");
});

// 
app.use(errorHandler);

// Export the app
export default app;
