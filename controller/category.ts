import { query } from "../config/pg.config";
import { dataInDB, validateParams } from "../utils/data-exits";
import { throwError } from "../utils/logger.console";
import { useQueryLimit, useRequest } from "../utils/req";

const createCategory = useRequest({
  async action(req, res) {
    try {
      const { category } = req.body;
      const exists = await dataInDB("category", category, "categories");
      if (exists) {
        return throwError({
          res,
          status: "403",
          message: "Category already exists.",
          error: "Conflict",
        });
      }

      const result = await query(
        `INSERT INTO categories (category) VALUES($1) RETURNING *`,
        [category]
      );

      res.status(200).json({
        message: "Category created successfully.",
        data: result?.rows[0],
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while creating the category.",
      });
    }
  },
});

const getCategories = useRequest({
  async action(req, res) {
    try {
      const results = await useQueryLimit({ req, table: "categories" });

      res.status(200).json({
        message: "Categories fetched successfully.",
        data: results?.rows,
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while fetching the categories.",
      });
    }
  },
});

const getCategory = useRequest({
  async action(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return throwError({
          res,
          status: "400",
          message: "Category ID is required.",
        });
      }

      const results = await query(`SELECT * FROM categories WHERE id=$1`, [id]);
      if (results?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: "Category not found.",
        });
      }

      res.status(200).json({
        message: "Category fetched successfully.",
        data: results?.rows[0],
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while fetching the category.",
      });
    }
  },
});

const updateCategory = useRequest({
  async action(req, res) {
    try {
      const { id } = req.params;
      validateParams(id, res, "Category ID is required.");

      const { category } = req.body;

      const result = await query(
        `UPDATE categories SET category=$1 WHERE id=$2 RETURNING *`,
        [category, id]
      );

      if (result?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: "Category not found or no changes were made.",
        });
      }

      res.status(200).json({
        message: "Category updated successfully.",
        data: result?.rows[0],
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while updating the category.",
      });
    }
  },
});

const deleteCategory = useRequest({
  async action(req, res) {
    try {
      const { id } = req.params;
      validateParams(id, res, "Category ID is required.");

      const result = await query(
        `DELETE FROM categories WHERE id=$1 RETURNING *`,
        [id]
      );

      if (result?.rowCount === 0) {
        return throwError({
          res,
          status: "404",
          message: "Category not found or no changes were made.",
        });
      }

      res.status(200).json({
        message: "Category deleted successfully.",
        data: result?.rows[0],
      });
    } catch (error) {
      return throwError({
        res,
        error,
        status: "500",
        message: "An error occurred while deleting the category.",
      });
    }
  },
});

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
