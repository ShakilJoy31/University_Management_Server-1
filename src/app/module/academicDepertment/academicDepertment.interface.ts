import {Model} from 'mongoose';
export type IAcademicDepartment = {
    title: string;
}

export type AcademicDepartment = Model<IAcademicDepartment, Record<string, unknown>>;

export type IAcademicDepartmentFilters = {
    searchTerm?: string;
}