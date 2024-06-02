import {Model} from 'objection';

class Users extends Model {
    id!: string;
    name!: string;
    email!: string;
    createdAt!: string;
    updatedAt!: string;
    passwordHash!: string;
    passwordSalt!: string;

    static get tableName() {
        return 'users';
    }
}
export { Users };