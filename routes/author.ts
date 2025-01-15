import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "../controller/author";
import { validateFields } from "../middleware/vaildateFields";
import { validateEmail } from "../middleware/vaildateEmail";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Endpoints related to author management
 */

/**
 * @swagger
 * /authors/create:
 *   post:
 *     tags: [Authors]
 *     summary: Create a new author
 *     description: Adds a new author to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the author.
 *               email:
 *                 type: string
 *                 description: The email of the author.
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: Author created successfully.
 *       400:
 *         description: Bad request.
 *       403:
 *         description: Email already taken.
 */
router.post(
  "/create",
  validateFields(["name", "email"]),
  validateEmail,
  createAuthor
);

/**
 * @swagger
 * /authors/update/{id}:
 *   patch:
 *     tags: [Authors]
 *     summary: Update an author
 *     description: Updates an author's details in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the author to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *       404:
 *         description: Author not found.
 */
router.patch("/update/:id", updateAuthor);

/**
 * @swagger
 * /authors/:
 *   get:
 *     tags: [Authors]
 *     summary: Get all authors
 *     description: Fetches all authors from the database.
 *     responses:
 *       200:
 *         description: A list of authors.
 *       404:
 *         description: No authors found.
 */
router.get("/", getAuthors);

/**
 * @swagger
 * /authors/delete/{id}:
 *   delete:
 *     tags: [Authors]
 *     summary: Delete an author
 *     description: Deletes an author from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the author to delete.
 *     responses:
 *       200:
 *         description: Author deleted successfully.
 *       404:
 *         description: Author not found.
 */
router.delete("/delete/:id", deleteAuthor);

router.get("/:id", getAuthor);

export default router;
