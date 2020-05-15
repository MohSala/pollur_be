import { success, failure } from '../lib/response_manager';
import { HTTPStatus } from '../constants/http_status';
const bcrypt = require("bcryptjs");
const upload = require("../services/imageUpload")
const jwt = require("jsonwebtoken");
import { config } from "../config/config"
import { CandidatePayload } from '../model/candidate';
import { UserPayload } from '../model/user';
import { MessagePayload } from "../model/message"


export class UserController {
    logger: any;
    userService: any;
    /**
     *
     * @param {*} logger Logger Object
     * @param {*} userService userService Object
     */
    constructor(logger: any, userService: any) {
        this.logger = logger;
        this.userService = userService;

    }

    async registerUser(req: any, res: any) {
        let { fullName, email, password, mobile } = req.body;
        if (!fullName || !email || !password || !mobile) {
            return failure(res, { message: 'Please fill in all required fields' },
                HTTPStatus.BAD_REQUEST);
        }
        // handle validation laater
        const existingUserRecordByMobile: UserPayload = await this.userService.findUser(mobile);
        const existingRecordByEmail: UserPayload = await this.userService.findOne(email);
        if (existingRecordByEmail || existingUserRecordByMobile) {
            return failure(res, { message: 'This User already exists' },
                HTTPStatus.BAD_REQUEST);
        }
        try {
            let param = {
                fullName, email, password, mobile
            }

            try {
                const salt: String = await bcrypt.genSalt(10);
                const hash: String = await bcrypt.hash(param.password, salt)
                param.password = hash
                const data: UserPayload = await this.userService.saveNewUser(param)
                // Generate code and add to cache
                // let code = Math.floor(Math.random() * 90000) + 10000;
                // will use this later after all is set
                const payload = {
                    fullName: data.fullName,
                    email: data.email,
                    mobile: data.mobile,
                    id: data._id,
                }
                const token = await jwt.sign(payload, config.secretKey, { expiresIn: '14d' })

                return success(res, {
                    message: `User Created Successfully`,
                    response: { user: data, token },
                }, HTTPStatus.OK);
            } catch (error) {
                this.logger.info("Error from signing token ", error)
                return failure(res, {
                    message: 'Sorry an error occured',
                }, HTTPStatus.BAD_REQUEST);
            }
        } catch (error) {
            this.logger.info("Error Occured during signup ", error)
            return failure(res, {
                message: 'Sorry an internal server error occured',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async login(req: any, res: any) {
        let { email, password } = req.body;
        try {
            if (!email || !password) {
                return failure(res, {
                    message: 'Please fill in Email and Password Field',
                }, HTTPStatus.BAD_REQUEST);
            }
            const user = await this.userService.findOne(email)
            if (!user) {
                return failure(res, { message: 'No user found' },
                    HTTPStatus.BAD_REQUEST);
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return failure(res, { message: 'Password incorrect' },
                    HTTPStatus.BAD_REQUEST);
            }
            else {
                const payload = {
                    fullName: user.fullName,
                    email: user.email,
                    mobile: user.mobile,
                    id: user._id,
                }
                const token = await jwt.sign(payload, config.secretKey, { expiresIn: '14d' })
                return success(res, {
                    message: 'User Signed in Successfully',
                    response: { user, token },
                }, HTTPStatus.OK);
            }

        } catch (error) {
            this.logger.info("Error Occured during signin ", error)
            return failure(res, {
                message: 'Sorry an internal server error occured',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addCandidate(req: any, res: any) {
        // set MAximim amnt of candidate later
        let { name, party, pollId, color } = req.body;
        name = name.toLowerCase();
        if (!name || !pollId || !color) {
            return failure(res, {
                message: 'Please fill in missing all missing fields',
            }, HTTPStatus.BAD_REQUEST);
        }
        try {
            const findCandidate: CandidatePayload = await this.userService.findCandidate(name, pollId);
            if (findCandidate) {
                return failure(res, {
                    message: 'You cannot use the same candidate name for this poll',
                }, HTTPStatus.BAD_REQUEST);
            }
            const param = {
                name, party, pollId, color
            }
            const data: CandidatePayload = await this.userService.addCandidate(param);
            return success(res, {
                message: `Candidate Created Successfully`,
                response: data,
            }, HTTPStatus.OK);

        } catch (error) {
            this.logger.info("Error Occured during candidate creation ", error)
            return failure(res, {
                message: 'Sorry an internal server error occured during candidate creation',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async loadCandidates(req: any, res: any) {
        const { id } = req.query;
        if (!id) {
            return failure(res, {
                message: 'Please add poll Id',
            }, HTTPStatus.BAD_REQUEST);
        }
        try {
            const data: CandidatePayload = await this.userService.loadCandidates(id);
            if (!data) {
                return failure(res, {
                    message: 'No candidates Found',
                }, HTTPStatus.NOT_FOUND);
            }
            return success(res, {
                message: `Candidate Records returned Successfully`,
                response: data,
            }, HTTPStatus.OK);
        } catch (error) {
            this.logger.info("Error Occured during candidate retrieval ", error)
            return failure(res, {
                message: 'Sorry an internal server error occured during candidate retrieval',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async takeMessage(req: any, res: any) {
        const { userId, message } = req.body;
        if (!userId || !message) {
            return failure(res, {
                message: 'Please fill in required fields',
            }, HTTPStatus.BAD_REQUEST);
        }
        try {
            const data: MessagePayload = await this.userService.takeMessage(userId, message);
            return success(res, {
                message: `Message Recorded Successfully`,
                response: data,
            }, HTTPStatus.OK);

        } catch (error) {
            this.logger.info("Error Occured while saving your message ", error)
            return failure(res, {
                message: 'Sorry an internal server error occured while saving your message',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }

};