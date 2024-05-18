import { Model } from 'objection';
class LabelsTasks extends Model {
    id!: string;
    taskId!: string;
    labelId!: string;

    static get tableName() {
        return 'labels_tasks';
    }
}
export { LabelsTasks };