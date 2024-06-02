import {type FileModel} from '../models/file.model';

class FileRepository {
    private fileModel: typeof FileModel;

    public constructor(fileModel: typeof FileModel) {
        this.fileModel = fileModel;
    }

    public async create(entity: any) {
        const { url } = entity;

        return this.fileModel.query().insert({url}).returning('*');
    }
}

export { FileRepository };