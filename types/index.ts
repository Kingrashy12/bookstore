import { Response } from "express";

export type Error = { message: string };

export type ThrowError = {
  error?: any;
  res: Response;
  status: "400" | "401" | "403" | "404" | "500";
  message?: string;
};
