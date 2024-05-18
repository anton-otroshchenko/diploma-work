import { Model } from 'objection';

class Labels extends Model {
    name!: string;

    static get tableName() {
        return 'labels';
    }
}

export { Labels };
