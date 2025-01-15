import { Pool, QueryResult, QueryResultRow } from "pg";
import "dotenv/config";
import { logger } from "../utils/logger.console";

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: 5432, // Adjust if using a non-default port
});

export default pool;

export const query = async (
  action: string,
  values?: unknown[]
): Promise<QueryResult<QueryResultRow> | undefined> => {
  const client = await pool.connect();
  try {
    return await client.query(action, values);
  } catch (error) {
    logger(error);
    throw new Error("Database query failed");
  } finally {
    client.release();
  }
};
