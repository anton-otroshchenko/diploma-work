import {Model} from "objection";

class FileModel extends Model {
    public 'id': number;
    public 'url': string;

    public static override get tableName(): string {
        return 'files';
    }
}

export { FileModel };