import { Schema, Model, model, Types } from 'mongoose';
import { config } from '../config/config'

export interface VotePayload {
    _id: string;
    userId: string;
    candidateId: string;
    pollId: string;
    eccKey: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const voteSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: config.mongo.collections.users,
            required: true,
            trim: true
        },
        candidateId: {
            type: Types.ObjectId,
            ref: config.mongo.collections.candidates,
            required: true,
            trim: true,
        },
        pollId: {
            type: Types.ObjectId,
            ref: config.mongo.collections.polls,
            required: true,
            trim: true
        },
        eccKey: {
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


export const voteModel = model(config.mongo.collections.votes, voteSchema);

