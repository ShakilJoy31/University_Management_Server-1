"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterController = void 0;
const academicSemester_service_1 = require("./academicSemester.service");
const pick_1 = __importDefault(require("../shared/pick"));
const academicSemester_constants_1 = require("./academicSemester.constants");
// import httpStatus from 'http-status';
// Creating a new semester here.
const createSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const academicSemesterData = __rest(req.body, []);
        const result = yield academicSemester_service_1.AcademicSemesterService.createSemester(academicSemesterData);
        res.status(200).json({
            success: true,
            message: 'Academic Semester is created successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// Getting all the semester here.
const getAllSemesters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, academicSemester_constants_1.academicSemesterFilterableFields);
        const paginationOption = (0, pick_1.default)(req.query, [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
        ]);
        const result = yield academicSemester_service_1.AcademicSemesterService.getAllSemesters(filters, paginationOption);
        res.status(200).json({
            success: true,
            message: 'Semesters retrieved successfully',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
// Getting single semester.
const getSingleSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield academicSemester_service_1.AcademicSemesterService.getSingleSemester(id);
        res.status(200).json({
            success: true,
            message: 'Particular Semester retrieved successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const updateSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = yield academicSemester_service_1.AcademicSemesterService.updateSemester(id, updatedData);
        res.status(200).json({
            success: true,
            message: 'Semester is updated successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield academicSemester_service_1.AcademicSemesterService.deleteSemester(id);
        res.status(200).json({
            success: true,
            message: 'Semester deleted successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AcademicSemesterController = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester
};
