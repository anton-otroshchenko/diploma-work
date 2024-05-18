import { config } from 'dotenv';

config();

const {
    APP_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_CLIENT,
    OPEN_AI_KEY,
    OPEN_AI_MODEL
} = process.env;

const ENV = {
    APP: {
        API_PATH: '/api',
        PORT: APP_PORT
    },
    DB: {
        DATABASE: DB_NAME,
        USERNAME: DB_USERNAME,
        PASSWORD: DB_PASSWORD,
        HOST: DB_HOST,
        PORT: DB_PORT,
        CLIENT: DB_CLIENT,
        DEBUG: false
    },
    OPEN_AI: {
        KEY: OPEN_AI_KEY,
        MODEL: OPEN_AI_MODEL,
    }
};

export { ENV };