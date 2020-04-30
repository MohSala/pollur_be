import { success, failure } from '../lib/response_manager';
import { HTTPStatus } from '../constants/http_status';
import { PollPayload } from '../model/poll';

export class PollController {
    logger: any;
    pollService: any;
    /**
     *
     * @param {*} logger Logger Object
     * @param {*} pollService pollService Object
     */
    constructor(logger: any, pollService: any) {
        this.logger = logger;
        this.pollService = pollService;

    }

    async createPoll(req: any, res: any) {
        const { name, category, type, userId } = req.body;
        if (!name || !category || !type) {
            return failure(res, { message: 'Please fill in all required fields including name, category, type' },
                HTTPStatus.BAD_REQUEST);
        }

        try {
            const param = {
                name, category, type, userId
            }
            const newPollrecord: PollPayload = await this.pollService.createPoll(param);
            return success(res, {
                message: `Voting Poll Successfully`,
                response: newPollrecord,
            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error from creating Poll", error)
            return failure(res, {
                message: 'Sorry an error occured while creating a poll',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async viewMyPolls(req: any, res: any) {
        const { id } = req.query;
        if (!id) {
            return failure(res, { message: 'Please Provide ID' },
                HTTPStatus.BAD_REQUEST);
        }
        try {
            const data: PollPayload = await this.pollService.getAllMyPolls(id);
            if (!data) {
                return success(res, {
                    message: `No Poll Data found`,
                }, HTTPStatus.NOT_FOUND);
            }
            return success(res, {
                message: `Your Polls have been returned Successfully`,
                response: data,
            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error from getting your Polls", error)
            return failure(res, {
                message: 'Sorry an error occured while getting polls',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }
}