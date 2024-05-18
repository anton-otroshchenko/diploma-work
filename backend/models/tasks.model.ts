import { Model } from 'objection';
class Tasks extends Model {
    id!: string;
    title!: string;
    details!: string;

    columnId!: string;

    static get tableName() {
        return 'tasks';
    }
}
export { Tasks };