"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'Invalid Id received!'
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast error is occured',
        errorMessage: errors,
    };
};
exports.default = handleCastError;
