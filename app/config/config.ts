
require('dotenv').config()

const appName = 'POLLUR';

export const config = {
  appName,
  server: {
    url: process.env.APP_URL,
    port: process.env.APP_PORT
  },
  baseUrl: process.env.BASE_URL,
  mongo: {
    connection: {
      host: process.env.MONGODB_HOST,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      port: process.env.MONGODB_PORT,
      dbProd: process.env.MONGODB_DATABASE_NAME
    },
    collections: {
      users: 'users',
      polls: 'polls',
      candidates: 'candidates'
    },

    queryLimit: process.env.MONGODB_QUERY_LIMIT,
    questionLimit: process.env.QUESTION_LIMIT
  },

  mongoErrorCode: {
    duplicateId: 11000
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE === 'true'
  },
  paystack: {
    api: process.env.PAYSTACK_API,
    key: process.env.PAYSTACK_API_KEY
  },
  secretKey: process.env.JWT_SECRET_KEY,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  aws: {
    access_key: process.env.AWS_ACCESS_KEY,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET
  },

};

