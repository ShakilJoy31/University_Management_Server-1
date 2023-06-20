import { Model, Schema, model } from 'mongoose';
import { IUser } from './user.schema';


export type UserModel = Model<IUser, object>;

export const userSchema = new Schema<IUser>({
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
    }
  }, {
    // Automatic give the field called createdAt and updatedAt
    timestamps: true
  });

export const User = model<IUser, UserModel>('User', userSchema);
