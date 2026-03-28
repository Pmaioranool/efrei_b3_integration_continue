const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const studentRoutes = require("./routes/studentRoutes");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Simple Swagger configuration for the API
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Student Management API",
    version: "1.0.0",
    description: "API for managing students in the application",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/students": {
      get: {
        summary: "Get all students",
        responses: {
          200: { description: "Successful response" },
        },
      },
      post: {
        summary: "Create a new student",
        responses: {
          201: { description: "Created" },
        },
      },
    },
  },
};

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/students", studentRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

module.exports = app;
