import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createStudentSchema } from "../validation/schemas/student.schema";
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from "../controllers/students.controller";

const router = Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/",
    validate(createStudentSchema),
    createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
