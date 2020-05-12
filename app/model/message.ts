import { Schema, Model, model, Types } from 'mongoose';
import { config } from '../config/config'

export interface MessagePayload {
    _id: string;
    message: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true
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


export const messageModel = model(config.mongo.collections.messages, messageSchema);

