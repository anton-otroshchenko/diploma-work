import fastify from 'fastify';
import { sectionsRoutes } from "./apis/sections.api";
import knex, { Knex } from 'knex';
import knexConfig from './knexfile';
import {Model} from "objection";
import {sitesRoutes} from "./apis/sites.api";
import {authRoutes} from "./apis/auth.api";


const server = fastify();

server.register(sectionsRoutes);
server.register(sitesRoutes);
server.register(authRoutes);

const knexInstance: Knex = knex(knexConfig);

Model.knex(knexInstance);

server.register(require('@fastify/cors'));


server.listen(3000, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Server running on port 3000');
});
