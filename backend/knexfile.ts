import { knexSnakeCaseMappers } from 'objection';
import { ENV } from './enums/env.enum';

const {
    DATABASE: database,
    USERNAME: username,
    PASSWORD: password,
    HOST: host,
    PORT: port,
    CLIENT: client,
    DEBUG: debug
} = ENV.DB;

const knexConfig = {
    client,
    connection: {
        user: username,
        port: parseInt(port as string, 10),
        host,
        database,
        password
    },
    migrations: {
        directory: './migrations',
        tableName: 'knex_migrations'
    },
    debug,
    ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true })
};

export default knexConfig;