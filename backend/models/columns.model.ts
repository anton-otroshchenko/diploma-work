import { Model } from 'objection';
class Columns extends Model {
    name!: string;

    static get tableName() {
        return 'columns';
    }
}
export { Columns };