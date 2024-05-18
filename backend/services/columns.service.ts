import {ColumnsRepository} from "../repositories/columns.repository";

class ColumnsService {
    private columnRepository: ColumnsRepository;

    constructor(columnRepository: ColumnsRepository) {
        this.columnRepository = columnRepository;
    }

    async getLabels() {
        return this.columnRepository.getLabels();
    }

    async addLabel(data:any){
        return this.columnRepository.addLabel(data)
    }
}

export { ColumnsService };
