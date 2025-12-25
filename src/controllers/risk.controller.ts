import { Request, Response } from "express";
import { sendSuccess } from "../utils/response.utils";
import { ConfigService } from "../services/config.service";

export async function getRiskByStudent(req: Request, res: Response): Promise<void> {
    const { studentId } = req.params;

    // TODO: Refactor this logic into a dedicated RiskService (T013)
    const configService = new ConfigService();

    // --- Mock Data (In a real app, this would come from other services) ---
    const mockStudentData = {
        attendancePercentage: 70,
        gpa: 2.5,
        failedSubjects: 1,
    };
    // --- End Mock Data ---

    const factorsTriggered: string[] = [];
    let riskScore = 0;

    // 1. Check Attendance
    const attendanceThreshold = await configService.getThresholdByFactor('ATTENDANCE_PERCENTAGE_BELOW');
    const attendanceDefault = 75; // Default value from spec
    const attendanceLimit = attendanceThreshold ? attendanceThreshold.value : attendanceDefault;
    if (mockStudentData.attendancePercentage < attendanceLimit) {
        factorsTriggered.push(`Attendance below ${attendanceLimit}%`);
        riskScore += 40;
    }

    // 2. Check GPA
    const gpaThreshold = await configService.getThresholdByFactor('GPA_BELOW');
    const gpaDefault = 2.0; // Default value from spec
    const gpaLimit = gpaThreshold ? gpaThreshold.value : gpaDefault;
    if (mockStudentData.gpa < gpaLimit) {
        factorsTriggered.push(`GPA below ${gpaLimit}`);
        riskScore += 30;
    }
    
    // 3. Check Failed Subjects
    const failedSubjectsThreshold = await configService.getThresholdByFactor('FAILED_SUBJECTS_ABOVE');
    const failedSubjectsDefault = 1; // Default value from spec
    const failedSubjectsLimit = failedSubjectsThreshold ? failedSubjectsThreshold.value : failedSubjectsDefault;
    if (mockStudentData.failedSubjects > failedSubjectsLimit) {
        factorsTriggered.push(`More than ${failedSubjectsLimit} failed subject(s)`);
        riskScore += 30;
    }

    let riskLevel = "low";
    if (riskScore > 70) {
        riskLevel = "high";
    } else if (riskScore > 40) {
        riskLevel = "medium";
    }

    sendSuccess(res, {
        studentId,
        riskScore,
        riskLevel,
        factorsTriggered
    });
}
