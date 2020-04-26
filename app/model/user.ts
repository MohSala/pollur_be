import { Schema, Model, model } from 'mongoose';
import { config } from '../config/config'

export interface UserPayload {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  mobile: number;
  active: boolean;
  status?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['APPROVED', 'DISAPPROVED', 'PENDING', 'AWAITING_DOCUMENT_UPLOAD'],
      default: 'PENDING'
    },
    active: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true
  }
);


export const userModel = model(config.mongo.collections.users, userSchema);

