import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

// Define an interface for the error object
interface ErrorWithContext extends Error {
  context?: string;
}

// Logger function
const logger = (error: ErrorWithContext, context: string = ""): void => {
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "short", // 'Mon', 'Tue', etc.

    month: "short", // 'Jan', 'Feb', etc.
    day: "2-digit", // '15'
    hour: "2-digit", // '06'
    minute: "2-digit", // '20'
    hour12: true, // 'AM/PM'
  });

  // Create an error message
  const errorMessage = `
[${timestamp}]  at: ${context} - Error: ${error.message || error}
Stack: ${error.stack || "No stack available"}
    `;

  console.error(errorMessage);

  const logFilePath = path.join(process.cwd(), "error.log");
  fs.appendFile(logFilePath, errorMessage, (err) => {
    if (err) {
      console.error("Failed to write error to log file:", err);
    }
  });
};

// Error handling middleware
const ErrorBoundry = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  logger(err as ErrorWithContext, req.originalUrl);

  // Send response
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "Unknown error",
  });
};

export default ErrorBoundry;
