import {Users} from "../models/users.model";

class UsersRepository {
    private model: typeof Users;

    constructor(model: typeof Users) {
        this.model = model;
    }

    public async find(id: number) {
        const user = await this.model
            .query()
            .findById(id)
            .first()

        if (!user) {
            return null;
        }

        return user;
    }

    public async findByEmail(email: string) {
        const user = await this.model
            .query()
            .where('email', email)
            .first()

        if (!user) {
            return null;
        }

        return user;
    }

    public async create(entity: any) {

        return await this.model
            .query()
            .insertGraphAndFetch({
                email: entity.email,
                passwordSalt: entity.passwordSalt,
                passwordHash: entity.passwordHash,
                name: entity.name,
            })
            .execute();
    }
}

export { UsersRepository };
