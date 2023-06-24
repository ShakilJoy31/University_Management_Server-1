import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";

const handleCastError = (error: mongoose.Error.CastError) =>{
    const errors:IGenericErrorMessage[] = [
        {
            path: error.path,
        message: 'Invalid Id received!'
        }
    ]

    const statusCode = 400
    return {
        statusCode,
        message: 'Cast error is occured',
        errorMessage: errors,
    }
}

export default handleCastError;