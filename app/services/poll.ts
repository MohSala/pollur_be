import { pollModel, PollPayload } from "../model/poll"
import { VotePayload, voteModel } from "../model/votes"
import { Types } from 'mongoose';

export class PollServices {
    logger: any;
    mongoclient: any;
    /**
     *
     * @param {*} logger Logger Object
     * @param {*} mongoclient mongoclient Object
     */
    constructor(logger: any, mongoclient: any) {
        this.logger = logger;
        this.mongoclient = new pollModel(mongoclient);
    }


    async createPoll(param: PollPayload) {
        const { name, category, type, userId } = param;
        const newPollRecord = new pollModel({
            name, category, type, userId
        })
        return newPollRecord.save();
    }

    async getAllMyPolls(id: string) {
        return pollModel.find({ userId: id, isDeleted: false }).sort(
            {
                updatedAt: -1
            }
        ).exec();
    }

    async getAllPolls(paginate) {
        return pollModel.find({ isDeleted: false }).populate('userId')
            .sort({ updatedAt: -1 })
            .limit(paginate.limit).skip(paginate.page * paginate.limit)
            .exec();
    }

    // Count query base on a customize search query
    async countWithSearchQuery() {
        const count = await pollModel.estimatedDocumentCount({ isDeleted: false }).exec();
        return count;
    }

    async findVoteRecord(userId: string, pollId: string) {
        return voteModel.find({ userId, pollId }).exec();
    }

    async increaseVoteCount(pollId: string) {
        return pollModel.findOneAndUpdate({ _id: pollId }, { $inc: { voteCount: 1 } }, { new: true }).exec();
    }

    async recordVote(param: VotePayload) {
        const { userId, candidateId, pollId, eccKey }: VotePayload = param;
        const newVoteRecord = new voteModel({
            userId, candidateId, pollId, eccKey
        })
        await this.increaseVoteCount(pollId);
        return newVoteRecord.save();
    }

    async checkForVote(userId: string, pollId: string) {
        return voteModel.findOne({ userId, pollId }).populate('candidateId').exec();
    }

    async countPoll(pollId: string) {
        return voteModel.find({ pollId }).populate("candidateId").exec();
    }

    async removePoll(pollId: string) {
        return pollModel.findOneAndUpdate({ _id: pollId }, { isDeleted: true }).exec();
    }

    async searchForPolls(query: string) {
        return pollModel.find({
            "$text": {
                "$search": query
            }
        }).populate('userId').exec()
    }

}