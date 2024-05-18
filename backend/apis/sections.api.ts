import { SectionsRepository } from "../repositories/sections.repository";
import { SectionService } from "../services/sections.service";
import { Sections } from "../models/sections.model";
import {FastifyInstance, } from "fastify";

const sectionsRepository = new SectionsRepository(Sections);

export const sectionService = new SectionService(sectionsRepository);

async function sectionsRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.get('/sections/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const sections = await sectionService.getBySiteId(id);
        console.log(sections)
        reply.send(sections);
    });
}

export { sectionsRoutes }