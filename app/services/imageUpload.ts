import { config } from "../config/config"
const AWS = require("aws-sdk");
const multer = require('multer')
const multerS3 = require('multer-s3')
AWS.config.update({
    secretAccessKey: config.aws.secret_access_key,
    accessKeyId: config.aws.access_key,
    region: config.aws.region,
})
const s3 = new AWS.S3()

// filter image type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG Format are allowed'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: config.aws.bucket,
        acl: "public-read",
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload