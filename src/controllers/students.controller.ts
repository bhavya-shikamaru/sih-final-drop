import { Request, Response } from "express";
import { Student } from "../models/students/Student.model";
import { sendSuccess, sendError } from "../utils/response.utils";

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const students = await Student.find();
        sendSuccess(res, students);
    } catch (error) {
        sendError(res, "Error fetching students", 500);
    }
};

export const getStudentById = async (req: Request, res: Response) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return sendError(res, "Student not found", 404);
        }
        sendSuccess(res, student);
    } catch (error) {
        sendError(res, "Error fetching student", 500);
    }
};

export const createStudent = async (req: Request, res: Response) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        sendSuccess(res, newStudent, 201);
    } catch (error) {
        sendError(res, "Error creating student", 500);
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return sendError(res, "Student not found", 404);
        }
        sendSuccess(res, student);
    } catch (error) {
        sendError(res, "Error updating student", 500);
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return sendError(res, "Student not found", 404);
        }
        sendSuccess(res, null, 204);
    } catch (error) {
        sendError(res, "Error deleting student", 500);
    }
};

export const searchStudents = async (req: Request, res: Response) => {
    try {
        const { name, page = 1, limit = 10, sortBy = 'name', order = 'asc' } = req.query;

        const query = name ? { name: { $regex: name, $options: 'i' } } : {};
        const sortOrder = order === 'desc' ? -1 : 1;

        const students = await Student.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort({ [sortBy as string]: sortOrder });

        const count = await Student.countDocuments(query);

        sendSuccess(res, {
            students,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page)
        });
    } catch (error) {
        sendError(res, "Error searching students", 500);
    }
};
