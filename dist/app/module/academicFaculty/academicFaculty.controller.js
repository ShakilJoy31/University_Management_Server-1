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
exports.AcademicFacultyController = void 0;
const academicFaculty_service_1 = require("./academicFaculty.service");
const pick_1 = __importDefault(require("../shared/pick"));
const academicFaculty_constants_1 = require("./academicFaculty.constants");
const pagination_1 = require("../../../constants/pagination");
const createFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const academicFacultyData = __rest(req.body, []);
        const result = yield academicFaculty_service_1.AcademicFacultyService.createFaculty(academicFacultyData);
        res.status(200).json({
            success: true,
            message: 'Academic Faculty is created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Getting all the faculty
const getAllFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, academicFaculty_constants_1.academicFacultyFilterableField);
        const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const result = academicFaculty_service_1.AcademicFacultyService.getAllFaculty(filters, paginationOptions);
        res.status(200).json({
            success: true,
            message: 'Academic Faculties retrieved successfully',
            meta: (yield result).meta,
            data: (yield result).data,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = yield academicFaculty_service_1.AcademicFacultyService.updatedFaculty(id, updatedData);
        res.status(200).json({
            success: true,
            message: 'Faculty is updated successfully.',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const getParticularFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield academicFaculty_service_1.AcademicFacultyService.getParticularFaculty(id);
        res.status(200).json({
            success: true,
            message: 'Particular faculty retrieved successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = academicFaculty_service_1.AcademicFacultyService.deleteFaculty(id);
        res.status(200).json({
            success: true,
            message: 'Faculty is deleted successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AcademicFacultyController = {
    createFaculty,
    getAllFaculty,
    updateFaculty,
    getParticularFaculty,
    deleteFaculty
};
