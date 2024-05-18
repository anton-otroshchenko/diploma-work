import { LabelsTasks } from "../models/label-tasks.model";

class LabelsTasksRepository {
    private model: typeof LabelsTasks;

    constructor(model: typeof LabelsTasks) {
        this.model = model;
    }

    async getLabelsTasks(taskId: string) {
        return this.model.query().select('*').where({taskId});
    }

    async addLabelTasks(data: any) {
        return this.model.query().insert(data);
    }
    async removeLabelTasks(taskId: string) {
        return this.model.query().where({taskId}).del().returning('taskId');
    }
}

export { LabelsTasksRepository };
