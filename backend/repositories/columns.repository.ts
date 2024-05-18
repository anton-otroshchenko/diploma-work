import { Columns } from "../models/columns.model";
class ColumnsRepository {
    private model: typeof Columns;

    constructor(model: typeof Columns) {
        this.model = model;
    }

    async getLabels() {
        return this.model.query();
    }

    async addLabel(data:any){
        return this.model.query().insert(data);
    }
}

export { ColumnsRepository };
