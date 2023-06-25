import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./users.model"



export const findLastUserId = async () =>{
    const lastUser = await User.findOne({
        role:'student'
    },{id:1, _id: 0}).sort({createdAt: -1}).lean(); 
    return lastUser?.id ? lastUser?.id.substring(4) : undefined;
}


export const generateStudentId = async (academicSemester: IAcademicSemester) =>{
    const currentId = await findLastUserId() || (0).toString().padStart(5, '0');
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    incrementId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementId}`
    return incrementId;
}

// For the faculty
export const findLastFacultyId = async () =>{
    const lastFaculty = await User.findOne({
        role:'faculty'
    },{id:1, _id: 0}).sort({
        createdAt: -1,
    }).lean();
    return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
}

export const generateFacultyId = async ():Promise<string> =>{
    const currentId = (await findLastFacultyId() || (0).toString().padStart(5, '0'));
    let incrementId = (parseInt(currentId)+1).toString().padStart(5, '0');
    incrementId = `F-${incrementId}`
    return incrementId
}

// Note: lean() is used to make the database provide data faster.
// Note: padStart(5, '0')