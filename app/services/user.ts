import { userModel } from '../model/user';
import { config } from '../config/config';
import axios from 'axios';
export class UserServices {
    logger: any;
    mongoclient: any;
    /**
     *
     * @param {*} logger Logger Object
     * @param {*} mongoclient mongoclient Object
     */
    constructor(logger: any, mongoclient: any) {
        this.logger = logger;
        this.mongoclient = new userModel(mongoclient);
    }

    public async findUser(mobile: any) {
        return userModel.findOne({ mobile })
    }

    public async findOne(email: string) {
        return userModel.findOne({ email })
    }

    public async saveNewUser(param: any) {
        const { fullName, email, password, mobile } = param;
        const newUserRecord = new userModel({
            fullName,
            email,
            password,
            mobile,
        })
        return newUserRecord.save();
    }
};