import { Request, Response, NextFunction } from "express";

// Validate Email Middleware
const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  // Regular expression for validating email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format. Please provide a valid email address.",
    });
  }

  next(); // Proceed to the next middleware or route handler
};

export { validateEmail };
