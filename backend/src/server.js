const app = require("./app");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
