import { success, failure } from '../lib/response_manager';
import { HTTPStatus } from '../constants/http_status';
import { PollPayload } from '../model/poll';
import pagination from "../services/pagination"
import { VotePayload } from '../model/votes';
const eccrypto = require("eccrypto");
const crypto = require("crypto")
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
                return failure(res, {
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

    async viewAllPolls(req: any, res: any) {
        try {
            let {
                limit,
                page,
                status
            } = req.query;

            limit = parseInt(limit) || 5;
            page = parseInt(page) || 1;
            // initialize pagination
            const paginate = {
                page: page === 1 ? 0 : page - 1 || 1,
                limit: limit || 5
            };

            const findAllPolls: Array<object> = await this.pollService.getAllPolls(paginate);
            if (!findAllPolls) {
                return failure(res, {
                    message: `No Poll Data found`,
                }, HTTPStatus.NOT_FOUND);
            }

            const count = await this.pollService.countWithSearchQuery()
            const meta = await pagination(count, paginate);
            return success(res, {
                message: `Your Polls have been returned Successfully`,
                response: findAllPolls,
                meta
            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error from getting  Polls", error)
            return failure(res, {
                message: 'Sorry an error occured while getting polls',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async registerAVote(req: any, res: any) {
        const { userId, candidateId, pollId } = req.body;
        if (!userId || !pollId || !candidateId) {
            return failure(res, {
                message: 'Please fill in missing credentials',
            }, HTTPStatus.BAD_REQUEST);
        }

        try {
            const generateEccKey: String = eccrypto.generatePrivate();
            const signCandidateId: String = crypto
                .createHash("sha256")
                .update(candidateId)
                .digest();
            const signedEccKey: String = await eccrypto.sign(generateEccKey, signCandidateId);
            const param = {
                userId,
                candidateId,
                pollId,
                eccKey: signedEccKey
            }
            const data: VotePayload = await this.pollService.recordVote(param);
            return success(res, {
                message: `Your Vote has been recorded Successfully`,
                response: data,
            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error from creating your vote", error)
            return failure(res, {
                message: 'Sorry an error occured while creating your vote',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async checkForACandidate(req: any, res: any) {
        const { userId, pollId } = req.query;
        if (!userId || !pollId) {
            return failure(res, {
                message: 'Please provide missing fields including userid and pollId',
            }, HTTPStatus.BAD_REQUEST);
        }

        try {
            const data: VotePayload = await this.pollService.checkForVote(userId, pollId);
            // if (!data) {
            //     return failure(res, {
            //         message: 'You havent voted for this guy yet',
            //     }, HTTPStatus.NOT_FOUND);
            // }
            return success(res, {
                message: `Your candidate has been returned Successfully`,
                response: data,
            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error from getting your voted candidate", error)
            return failure(res, {
                message: 'Sorry an error occured while getting voted candidate',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async filterAndGroup(arr) {
        const filterArr = []
        for (let ar of arr) {
            filterArr.push(ar.candidateId.name)
        }
        var initialValue = {}
        var reducer = function (tally, vote) {
            if (!tally[vote]) {
                tally[vote] = 1;
            } else {
                tally[vote] = tally[vote] + 1;
            }
            return tally;
        }
        var result = filterArr.reduce(reducer, initialValue)
        return Array(result);
    }

    async getVotes(req: any, res: any) {
        const { pollId } = req.query;
        if (!pollId) {
            return failure(res, {
                message: "Please provide poll id"
            }, HTTPStatus.BAD_REQUEST)
        }

        try {
            const data: VotePayload = await this.pollService.countPoll(pollId);
            if (!data) {
                return failure(res, {
                    message: "No votes have been recorded"
                }, HTTPStatus.NOT_FOUND)
            }
            const filteredArray: Array<object> = await this.filterAndGroup(data)
            return success(res, {
                message: `Votes returned Successfully`,
                response: filteredArray,
            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error from getting your votes", error)
            return failure(res, {
                message: 'Sorry an error occured while getting votes',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removePolls(req: any, res: any) {
        const { pollId } = req.body;
        if (!pollId) {
            return failure(res, {
                message: "Please provide poll id"
            }, HTTPStatus.BAD_REQUEST)
        }
        try {
            const data: PollPayload = await this.pollService.removePoll(pollId);
            if (!data) {
                return failure(res, {
                    message: "Poll could not be deleted"
                }, HTTPStatus.NOT_FOUND)
            }
            return success(res, {
                message: `Poll Deleted Successfully`,
                response: data,
            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error from deleting poll", error)
            return failure(res, {
                message: 'Sorry an error occured while deleting this poll',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async searchPoll(req: any, res: any) {
        const { query } = req.query;
        let {
            limit,
            page,
        } = req.query;

        limit = parseInt(limit) || 5;
        page = parseInt(page) || 1;
        // initialize pagination
        const paginate = {
            page: page === 1 ? 0 : page - 1 || 1,
            limit: limit || 5
        };
        if (!query) {
            return failure(res, {
                message: "Please provide search param"
            }, HTTPStatus.BAD_REQUEST)
        }
        try {
            const data = await this.pollService.searchForPolls(query);
            if (data.length == 0) {
                return failure(res, {
                    message: "No Poll Data Found"
                }, HTTPStatus.NOT_FOUND)
            }
            return success(res, {
                message: `Searched Polls returned Successfully`,
                response: data,

            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error from searching polls", error)
            return failure(res, {
                message: 'Sorry an error occured while searching this polls',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

}