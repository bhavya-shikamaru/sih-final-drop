import { Request, Response } from "express";
import { Attendance } from "../models/attendance/Attendance.model";
import { sendSuccess, sendError } from "../utils/response.utils";

export const createAttendance = async (req: Request, res: Response) => {
    try {
        const newAttendance = new Attendance(req.body);
        await newAttendance.save();
        sendSuccess(res, newAttendance, 201);
    } catch (error) {
        sendError(res, "Error creating attendance record", 500);
    }
};

export const getAllAttendance = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.find().populate('studentId');
        sendSuccess(res, attendance);
    } catch (error) {
        sendError(res, "Error fetching attendance records", 500);
    }
};

export const getAttendanceById = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.findById(req.params.id).populate('studentId');
        if (!attendance) {
            return sendError(res, "Attendance record not found", 404);
        }
        sendSuccess(res, attendance);
    } catch (error) {
        sendError(res, "Error fetching attendance record", 500);
    }
};

export const updateAttendance = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!attendance) {
            return sendError(res, "Attendance record not found", 404);
        }
        sendSuccess(res, attendance);
    } catch (error) {
        sendError(res, "Error updating attendance record", 500);
    }
};

export const deleteAttendance = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return sendError(res, "Attendance record not found", 404);
        }
        sendSuccess(res, null, 204);
    } catch (error) {
        sendError(res, "Error deleting attendance record", 500);
    }
};
