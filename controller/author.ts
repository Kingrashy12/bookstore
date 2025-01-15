import { query } from "../config/pg.config";
import { dataInDB } from "../utils/data-exits";
import { logger, throwError } from "../utils/logger.console";
import { useQueryLimit, useRequest } from "../utils/req";

const createAuthor = useRequest({
  async action(req, res) {
    try {
      const { name, email } = req.body;

      const authorExists = await dataInDB("email", email, "authors");
      if (authorExists) {
        return throwError({
          res,
          status: "403",
          message: "An author with the provided email address already exists.",
        });
      }

      const newAuthor = await query(
        `INSERT INTO authors (name, email) VALUES($1, $2) RETURNING *`,
        [name, email]
      );

      res.status(200).json({
        message: "Author created successfully.",
        data: newAuthor?.rows[0],
      });
    } catch (error) {
      logger(error);
      throwError({
        res,
        status: "500",
        message: "An error occurred while creating the author.",
        error,
      });
    }
  },
});

const updateAuthor = useRequest({
  async action(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (!id) {
        return throwError({
          res,
          status: "400",
          message: "Author ID is required.",
        });
      }

      if (!Object.keys(updates).length) {
        return throwError({
          res,
          status: "400",
          message: "No fields provided for update.",
        });
      }

      const fieldsToUpdate: string[] = [];
      const values: unknown[] = [];
      let index = 1;

      for (const [key, value] of Object.entries(updates)) {
        fieldsToUpdate.push(`${key} = $${index++}`);
        values.push(value);
      }

      values.push(id);

      const queryText = `
        UPDATE authors
        SET ${fieldsToUpdate.join(", ")}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $${index}
        RETURNING *;
      `;

      const result = await query(queryText, values);

      if (result?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: "Author not found or no changes were made.",
        });
      }

      res.status(200).json({
        message: "Author updated successfully.",
        data: result?.rows[0],
      });
    } catch (error) {
      throwError({
        res,
        status: "500",
        message: "An error occurred while updating the author.",
        error,
      });
    }
  },
});

const getAuthors = useRequest({
  async action(req, res) {
    try {
      const lists = await useQueryLimit({ req, table: "authors" });

      res.status(200).json({
        message: "Authors fetched successfully.",
        data: lists?.rows,
      });
    } catch (error) {
      throwError({
        res,
        status: "500",
        message: "An error occurred while fetching authors.",
        error,
      });
    }
  },
});

const getAuthor = useRequest({
  async action(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return throwError({
          res,
          status: "400",
          message: "Author ID is required.",
        });
      }

      const author = await query(`SELECT * FROM authors WHERE id=$1`, [id]);

      if (!author?.rowCount) {
        return throwError({
          res,
          status: "404",
          message: "Author not found.",
        });
      }

      res.status(200).json({
        message: "Author fetched successfully.",
        data: author?.rows[0],
      });
    } catch (error) {
      throwError({
        res,
        status: "500",
        message: "An error occurred while fetching the author.",
        error,
      });
    }
  },
});

const deleteAuthor = useRequest({
  async action(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return throwError({
          res,
          status: "400",
          message: "Author ID is required.",
        });
      }

      const result = await query(
        `DELETE FROM authors WHERE id=$1 RETURNING *`,
        [id]
      );

      if (!result?.rowCount) {
        return throwError({
          res,
          status: "404",
          message: `No author found with ID ${id}.`,
        });
      }

      res.status(200).json({
        message: `Author with ID ${id} was deleted successfully.`,
        data: result?.rows[0],
      });
    } catch (error) {
      logger(error);
      throwError({
        res,
        status: "500",
        message: "An error occurred while deleting the author.",
        error,
      });
    }
  },
});

export { createAuthor, updateAuthor, getAuthors, getAuthor, deleteAuthor };
