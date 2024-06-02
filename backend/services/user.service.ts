import {UsersRepository} from "../repositories/users.repository";
import {genSalt, hash} from 'bcrypt';
import { type JWTPayload, decodeJwt, SignJWT } from 'jose';

class UserService {
    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async findByEmail(email: string){
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        return user;
    }

    public async signIn(
        userSignInDto: any,
    ) {
        const { password, email } = userSignInDto;

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("User does not exist");
        }

        const userPrivateData = (await this.usersRepository.findByEmail(
            user.email,
        ));

        const hashedPass = await hash(password, userPrivateData?.passwordSalt as string);

        const hasSamePassword = hashedPass === userPrivateData?.passwordHash;

        if (!hasSamePassword) {
            throw new Error('password is not correct');
        }

        return {
            token: await new SignJWT({
                userId: user.id,
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('24h')
                .sign(new TextEncoder().encode('secret')),
            user,
        };
    }

    public async findByToken(token: string){
        const { userId } = decodeJwt(token);

        if (!userId) {
            throw new Error("Invalid JWT token");
        }

        const user = await this.usersRepository.find(Number(userId));

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    public async create(
        payload: any,
    ) {
        const existingUser = await this.usersRepository.findByEmail(payload.email);

        if(existingUser) {
            throw new Error('User already exists');
        }

        const passwordSalt = await genSalt(2);
        const passwordHash = await hash(
            payload.password,
            passwordSalt,
        );

        console.log(passwordSalt)
        console.log(passwordHash);

        const user = await this.usersRepository.create({
                passwordHash,
                passwordSalt,
                email: payload.email,
                name: payload.name,

            }
        );

        const token = await new SignJWT({
            userId: user.id,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(new TextEncoder().encode('secret'));

        return {
            user,token
        }
    }

}

export { UserService };
