const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const winston = require("winston");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Simple Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
