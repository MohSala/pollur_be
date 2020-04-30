import { Schema, Model, model, Types } from 'mongoose';
import { config } from '../config/config'

export interface CandidatePayload {
    _id: string;
    color: string;
    name: string;
    party: string;
    pollId: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const candidateSchema = new Schema(
    {
        color: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        party: {
            type: String,
            trim: true
        },
        pollId: {
            type: Types.ObjectId,
            ref: config.mongo.collections.polls
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


export const candidateModel = model(config.mongo.collections.candidates, candidateSchema);

