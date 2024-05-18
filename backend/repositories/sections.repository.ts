import { Sections } from '../models/sections.model';
import { Sites } from "../models/sites.model";

const sitesModal = new Sites();

class SectionsRepository {
    private model: typeof Sections;

    constructor(model: typeof Sections) {
        this.model = model;
    }


    async getById(id: string) {
        return this.model.query().findById(id);
    }

    async getSection() {
        return this.model.query();
    }

    async addSection(data:any){
        await sitesModal
            .$relatedQuery('sections')
            .for(data.siteId)
            .insert({
                type: data.type,
                content: data.content,
            })
            .returning('*');
    }

    async getSectionsBySiteId(siteId: string) {
        return await sitesModal.$relatedQuery('sections').for(siteId);
    }

    async removeSection(id: string) {
        return this.model.query().deleteById(id);
    }
}

export { SectionsRepository };
