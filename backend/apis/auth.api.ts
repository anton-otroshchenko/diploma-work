import {UsersRepository} from "../repositories/users.repository";
import {UserService} from "../services/user.service";
import {Users} from "../models/users.model";
import {FastifyInstance} from "fastify";

const usersRepository = new UsersRepository(Users);
const usersService = new UserService(usersRepository)

async function authRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.post('/sign-up', async (request, reply) => {
        console.log(request.body);
        const site = await usersService.create(request.body);
        console.log(site)
        reply.send(site);
    });
    fastify.post('/sign-in', async (request, reply) => {
        console.log(request.body);
        const user = await usersService.signIn(request.body);
        console.log(user)
        reply.send(user);
    })
    fastify.post('/current', async (request, reply) => {
        const token = request.body as {
            token: string;
        }
        const user = await usersService.findByToken(token.token)
        reply.send(user)
    })
}

export { authRoutes }