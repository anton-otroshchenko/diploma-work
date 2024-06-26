import { Sites } from '../models/sites.model';
class SitesRepository {
    private model: typeof Sites;

    constructor(model: typeof Sites) {
        this.model = model;
    }

    async getById(id: string) {
        return this.model.query().findById(id);
    }

    async getSites(userId: string) {
        return this.model.query().where({userId}).execute();
    }

    async addSite(data:any){
        return this.model.query().insert(data);
    }

    async removeSite(id: string) {
        return this.model.query().deleteById(id);
    }
}

export { SitesRepository };
