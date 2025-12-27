import { Request, Response } from "express";
import { Academic } from "../models/academics/Academic.model";
import { sendSuccess, sendError } from "../utils/response.utils";

export const createAcademic = async (req: Request, res: Response) => {
    try {
        const newAcademic = new Academic(req.body);
        await newAcademic.save();
        sendSuccess(res, newAcademic, 201);
    } catch (error) {
        sendError(res, "Error creating academic record", 500);
    }
};

export const getAllAcademics = async (req: Request, res: Response) => {
    try {
        const academics = await Academic.find().populate('studentId');
        sendSuccess(res, academics);
    } catch (error) {
        sendError(res, "Error fetching academic records", 500);
    }
};

export const getAcademicById = async (req: Request, res: Response) => {
    try {
        const academic = await Academic.findById(req.params.id).populate('studentId');
        if (!academic) {
            return sendError(res, "Academic record not found", 404);
        }
        sendSuccess(res, academic);
    } catch (error) {
        sendError(res, "Error fetching academic record", 500);
    }
};

export const updateAcademic = async (req: Request, res: Response) => {
    try {
        const academic = await Academic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!academic) {
            return sendError(res, "Academic record not found", 404);
        }
        sendSuccess(res, academic);
    } catch (error) {
        sendError(res, "Error updating academic record", 500);
    }
};

export const deleteAcademic = async (req: Request, res: Response) => {
    try {
        const academic = await Academic.findByIdAndDelete(req.params.id);
        if (!academic) {
            return sendError(res, "Academic record not found", 404);
        }
        sendSuccess(res, null, 204);
    } catch (error) {
        sendError(res, "Error deleting academic record", 500);
    }
};
