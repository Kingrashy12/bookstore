import { Response } from "express";
import { query } from "../config/pg.config";
import { throwError } from "./logger.console";

export const dataInDB = async (
  column: string,
  value: unknown,
  field: "authors" | "categories" | "books"
) => {
  // Validate column and field to avoid SQL injection
  const allowedFields = ["authors", "categories", "books"];
  const allowedColumns = ["id", "email", "name", "author_id", "category"];

  if (!allowedFields.includes(field)) {
    throw new Error(`Invalid field name: ${field}`);
  }

  if (!allowedColumns.includes(column)) {
    throw new Error(`Invalid column name: ${column}`);
  }

  // Query the database
  const data = await query(`SELECT * FROM ${field} WHERE ${column}=$1`, [
    value,
  ]);

  return data?.rowCount && data.rowCount >= 1;
};

export const validateParams = (
  value: unknown,
  res: Response,
  message: string
) => {
  if (!value) {
    return throwError({
      res,
      status: "400",
      message,
    });
  }
};
