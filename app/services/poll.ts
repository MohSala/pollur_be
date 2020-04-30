import { pollModel, PollPayload } from "../model/poll"


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
        return pollModel.find({ userId: id }).sort(
            {
                updatedAt: -1
            }
        ).exec();
    }

}