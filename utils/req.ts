import { NextFunction, Request, Response } from "express";
import { query } from "../config/pg.config";
import { QueryResult, QueryResultRow } from "pg";

type ApiRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
  method: () => void
) => void;
export const apiRequest: ApiRequest = async (req, res, next, method) => method;

type RequestAction = {
  action: (req: Request, res: Response) => Promise<any>;
};

/** A function that takes a request action and returns the action
 */
export const useRequest = ({ action }: RequestAction) => action;

type RequestWithLimit = {
  page?: number;
  limit?: number;
  req: Request;
  table: string;
  query?: (
    action: string,
    values?: unknown[]
  ) => Promise<QueryResult<QueryResultRow> | undefined>;
  whereClause?: string;
  values?: unknown[];
  sortBy?: string | any;
  order?: "asc" | "desc";
};

export const useQueryLimit = async ({
  req,
  page = 1,
  limit = 10,
  table,
  whereClause = "",
  values = [],
  sortBy = "id", // Default sort field
  order = "asc", // Default sort order (asc/desc)
}: RequestWithLimit) => {
  // Destructure page, limit, sortBy, order from req.query (default values provided)
  const {
    page: queryPage,
    limit: queryLimit,
    sortBy: querySortBy,
    order: queryOrder,
  } = req.query;

  // Use query parameters if available, else fall back to defaults
  const Page = queryPage ? Number(queryPage) : page;
  const Limit = queryLimit ? Number(queryLimit) : limit;
  const SortBy = querySortBy || sortBy;
  const Order =
    queryOrder && ["asc", "desc"].includes(queryOrder.toString().toLowerCase())
      ? queryOrder
      : order;

  // Validation to ensure valid page and limit
  if (Page < 1 || Limit < 1) {
    throw new Error("Page and Limit must be greater than 0.");
  }

  // Calculate the offset for pagination
  const offset = (Page - 1) * Limit;

  // Create the base query string with the WHERE clause if present
  let queryString = `SELECT * FROM ${table}`;

  // Add filtering conditions if whereClause is provided
  if (whereClause) {
    queryString += ` WHERE ${whereClause}`;
  }

  // Add sorting condition
  queryString += ` ORDER BY ${SortBy} ${Order.toString().toUpperCase()}`;

  // Add pagination (LIMIT and OFFSET)
  queryString += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

  // Combine existing values with the pagination parameters
  const queryValues = [...values, Limit, offset];

  // Perform the query with pagination, filtering, and sorting
  const results = await query(queryString, queryValues);

  return results;
};
