"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // User is referencing student and student is referencing --> faculty, department, and semester.
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, {
    // Automatic give the field called createdAt and updatedAt
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
