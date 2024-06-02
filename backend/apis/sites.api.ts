import {SitesRepository} from "../repositories/sites.repository";
import {SitesService} from "../services/sites.service";
import {Sites} from "../models/sites.model";
import {FastifyInstance} from "fastify";
import {SectionService} from "../services/sections.service";
import {SectionsRepository} from "../repositories/sections.repository";
import {Sections} from "../models/sections.model";

const sitesRepository = new SitesRepository(Sites);
const sectionRepository = new SectionsRepository(Sections);
const sectionService = new SectionService(sectionRepository)

const sitesService = new SitesService(sitesRepository, sectionService);

async function sitesRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.post('/sites', async (request, reply) => {
        const site = await sitesService.addSite(request.body);
        reply.send(site);
    });
    fastify.post('/sitesByUserId', async (request, reply) => {
        const body = request.body as { userId: string};
        console.log('here', body)
        const sites = await sitesService.getSites(body.userId);
        reply.send(sites);
    })
}

export { sitesRoutes }