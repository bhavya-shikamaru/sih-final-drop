import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createStudentSchema } from "../validation/schemas/student.schema";
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    searchStudents
} from "../controllers/students.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing students
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Retrieve a list of all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get("/", getAllStudents);

/**
 * @swagger
 * /api/students/search:
 *   get:
 *     summary: Search for students by name
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name to search for (case-insensitive).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: name
 *         description: The field to sort by.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: asc
 *           enum: [asc, desc]
 *         description: The sort order.
 *     responses:
 *       200:
 *         description: A paginated list of students.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
router.get("/search", searchStudents);

router.get("/:id", getStudentById);
router.post("/",
    validate(createStudentSchema),
    createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;

