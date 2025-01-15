import { Router } from "express";
import {
  deleteBook,
  getAuthorsBook,
  getBook,
  getBookByCategory,
  getBooks,
  publishBook,
} from "../controller/book";
import { validateFields } from "../middleware/vaildateFields";

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Endpoints related to books management
 */
const router = Router();

/**
 * @swagger
 * /books/publish:
 *   post:
 *     summary: Publish a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author_id:
 *                 type: string
 *               title:
 *                 type: string
 *               category_id:
 *                 type: string
 *             required:
 *               - author_id
 *               - title
 *               - category_id
 *     responses:
 *       200:
 *         description: Book successfully published
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */
router.post(
  "/publish",
  validateFields(["author_id", "title", "category_id"]),
  publishBook
);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by its ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details retrieved successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getBooks);

/**
 * @swagger
 * /books/author/{author_id}:
 *   get:
 *     summary: Get books by an author
 *     tags: [Books]
 *     parameters:
 *       - name: author_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Books by the author retrieved successfully
 *       404:
 *         description: No books found for the author
 *       500:
 *         description: Server error
 */
router.get("/author/:author_id", getAuthorsBook);

/**
 * @swagger
 * /books/category/{category_id}:
 *   get:
 *     summary: Get books by category
 *     tags: [Books]
 *     parameters:
 *       - name: category_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Books by category retrieved successfully
 *       404:
 *         description: No books found for the category
 *       500:
 *         description: Server error
 */
router.get("/category/:category_id", getBookByCategory);

/**
 * @swagger
 * /books/delete/{id}:
 *   delete:
 *     summary: Delete a book by its ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author_id:
 *                 type: string
 *             required:
 *               - author_id
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *       403:
 *         description: Unauthorized to delete the book
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", deleteBook);

export default router;
