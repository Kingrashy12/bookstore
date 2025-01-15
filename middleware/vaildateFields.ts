import { Request, Response, NextFunction } from "express";

// Middleware function to validate required fields
export const validateFields =
  (requiredFields: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter(
      (field) => !req.body[field] || req.body[field].trim() === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Validation Error",
        error: `The following fields are required: ${missingFields.join(", ")}`,
      });
    }

    next();
  };
