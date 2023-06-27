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
exports.AcademicDepartmentController = void 0;
const academicDepertment_service_1 = require("./academicDepertment.service");
const pick_1 = __importDefault(require("../shared/pick"));
const academicDepertment_constants_1 = require("./academicDepertment.constants");
const pagination_1 = require("../../../constants/pagination");
const createDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const academicDepartmentData = __rest(req.body, []);
        const result = yield academicDepertment_service_1.AcademicDepartmentService.createDepartment(academicDepartmentData);
        res.status(200).json({
            success: true,
            message: 'Academic Department is created successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllAcademicDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, academicDepertment_constants_1.academicDepartmentFilterableField);
        const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const result = yield academicDepertment_service_1.AcademicDepartmentService.getAllDepartment(filters, paginationOptions);
        res.status(200).json({
            success: true,
            message: "Academic Departments retrieved successfully",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
const getParticularDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield academicDepertment_service_1.AcademicDepartmentService.getParticularDepartment(id);
        res.status(200).json({
            success: true,
            message: 'Particular Department retrieved successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteParticularDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield academicDepertment_service_1.AcademicDepartmentService.deleteParticularDepartment(id);
        res.status(200).json({
            success: true,
            message: 'Department is deleted successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const updateDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = yield academicDepertment_service_1.AcademicDepartmentService.updateDepartment(id, updatedData);
        res.status(200).json({
            success: true,
            message: 'Department is updated successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AcademicDepartmentController = {
    createDepartment,
    getAllAcademicDepartment,
    getParticularDepartment,
    deleteParticularDepartment,
    updateDepartment
};
