import { Schema, Model, model, Types } from 'mongoose';
import { config } from '../config/config'

export interface PollPayload {
    _id: string;
    name: string;
    category: string;
    type: string;
    userId: string;
    isDeleted: boolean;
    voteCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const pollSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        type: {
            type: String,
            enum: ['public', 'private'],
            default: 'public'
        },
        userId: {
            type: Types.ObjectId,
            ref: config.mongo.collections.users
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        voteCount: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true
    }
);


export const pollModel = model(config.mongo.collections.polls, pollSchema);

