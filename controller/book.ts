import { query } from "../config/pg.config";
import { validateParams } from "../utils/data-exits";
import { generateISBN } from "../utils/global";
import { throwError } from "../utils/logger.console";
import { useQueryLimit, useRequest } from "../utils/req";

const publishBook = useRequest({
  async action(req, res) {
    try {
      const { author_id, title, category_id } = req.body;

      const publication_year = new Date().getFullYear();
      let isbn = generateISBN();

      const result = await query(
        `INSERT INTO books (author_id, title, category_id, publication_year, isbn) VALUES($1,$2,$3,$4,$5) RETURNING *`,
        [author_id, title, category_id, publication_year, isbn]
      );

      if (result?.rowCount === 0) {
        return throwError({
          res,
          status: "500",
          message: "Failed to publish the book. Please try again.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Book published successfully",
        data: result?.rows[0],
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while publishing the book.",
      });
    }
  },
});

const getBooks = useRequest({
  async action(req, res) {
    try {
      const { category_id, author_id } = req.query;

      let whereClause = "";
      let values = [];

      if (category_id) {
        whereClause += "category_id = $1";
        values.push(category_id);
      }

      if (author_id) {
        if (whereClause) whereClause += " AND ";
        whereClause += "author_id = $2";
        values.push(author_id);
      }

      const books = await useQueryLimit({
        req,
        table: "books",
        whereClause,
        values,
      });

      if (books?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: "No books found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books?.rows,
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while fetching books.",
      });
    }
  },
});

const getBook = useRequest({
  async action(req, res) {
    try {
      const { id } = req.params;

      // Validate if ID exists
      validateParams(id, res, "Book ID is required.");

      // Query for the book by ID
      const book = await query(`SELECT * FROM books WHERE id=$1`, [id]);

      // If no book is found, return a 404 error
      if (book?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: "Book not found.",
        });
      }

      // If book is found, return the data
      res.status(200).json({
        message: "Book fetched successfully.",
        data: book?.rows[0],
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while fetching the book.",
      });
    }
  },
});

const getAuthorsBook = useRequest({
  async action(req, res) {
    try {
      const { author_id } = req.params;

      // Validate that author_id is provided
      validateParams(author_id, res, "Author ID is required.");

      const books = await useQueryLimit({
        req,
        table: "books",
        whereClause: "author_id = $1",
        values: [author_id],
      });

      // If no books are found, return a 404 error
      if (books?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: "No books found for the given author.",
        });
      }

      // Return the books in the response
      res.status(200).json({
        message: "Books fetched successfully.",
        data: books?.rows,
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while fetching the books.",
      });
    }
  },
});

const getBookByCategory = useRequest({
  async action(req, res) {
    try {
      const { category_id } = req.params;

      // Validate that category_id is provided
      validateParams(category_id, res, "Category ID is required.");

      const books = await useQueryLimit({
        req,
        table: "books",
        whereClause: "category_id=$1",
        values: [category_id],
      });

      // If no books are found for the category, return a 404 error
      if (books?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: "No books found for the given category.",
        });
      }

      // Return the books in the response
      res.status(200).json({
        message: "Books fetched successfully.",
        data: books?.rows,
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while fetching books by category.",
      });
    }
  },
});

const deleteBook = useRequest({
  async action(req, res) {
    try {
      const { id } = req.params;
      const { author_id } = req.body;

      // Validate if the book ID and author ID are provided
      if (!id || !author_id) {
        return throwError({
          res,
          status: "400",
          message: "Book ID and Author ID are required.",
        });
      }

      // Check if the book exists and belongs to the author
      const book = await query(`SELECT * FROM books WHERE id = $1`, [id]);

      if (book?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: `Book with ID ${id} not found.`,
        });
      }

      if (book?.rows[0].author_id !== author_id) {
        return throwError({
          res,
          status: "403",
          message: "You are not authorized to delete this book.",
        });
      }

      // Delete the book if the author is authorized
      const result = await query(`DELETE FROM books WHERE id = $1`, [id]);

      if (result?.rowCount === 0) {
        return throwError({
          res,
          status: "500",
          message: "Failed to delete the book.",
        });
      }

      res.status(200).json({
        success: true,
        message: `Book with ID ${id} was deleted successfully.`,
      });
    } catch (error) {
      return throwError({
        res,
        status: "500",
        error,
        message: "An error occurred while deleting the book.",
      });
    }
  },
});

export {
  publishBook,
  getBooks,
  getBook,
  getAuthorsBook,
  getBookByCategory,
  deleteBook,
};
