import { Router } from "express";
import {
    createAcademic,
    getAllAcademics,
    getAcademicById,
    updateAcademic,
    deleteAcademic
} from "../controllers/academics.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Academics
 *   description: API for managing academic records
 */

/**
 * @swagger
 * /api/academics:
 *   get:
 *     summary: Retrieve a list of all academic records
 *     tags: [Academics]
 *     responses:
 *       200:
 *         description: A list of academic records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Academic'
 */
router.get("/", getAllAcademics);

/**
 * @swagger
 * /api/academics/{id}:
 *   get:
 *     summary: Retrieve a single academic record by ID
 *     tags: [Academics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An academic record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Academic'
 *       404:
 *         description: Academic record not found.
 */
router.get("/:id", getAcademicById);

/**
 * @swagger
 * /api/academics:
 *   post:
 *     summary: Create a new academic record
 *     tags: [Academics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Academic'
 *     responses:
 *       21:
 *         description: Academic record created successfully.
 */
router.post("/", createAcademic);

/**
 * @swagger
 * /api/academics/{id}:
 *   put:
 *     summary: Update an academic record by ID
 *     tags: [Academics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Academic'
 *     responses:
 *       200:
 *         description: Academic record updated successfully.
 *       404:
 *         description: Academic record not found.
 */
router.put("/:id", updateAcademic);

/**
 * @swagger
 * /api/academics/{id}:
 *   delete:
 *     summary: Delete an academic record by ID
 *     tags: [Academics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Academic record deleted successfully.
 *       404:
 *         description: Academic record not found.
 */
router.delete("/:id", deleteAcademic);

export default router;

