import { LabelsTasksRepository } from "../repositories/tasks-labels.repository";

class LabelTasksService {
    private tasksRepository: LabelsTasksRepository;

    constructor(tasksRepository: LabelsTasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async getTasks(id: string) {
        return this.tasksRepository.getLabelsTasks(id);
    }

    async addTasks(data: any[]) {
        const promises = data.map(label => this.tasksRepository.addLabelTasks(label));
        const arr: any[] = await Promise.all(promises);
        return arr;
    }

    async removeTask(id:string){
        return this.tasksRepository.removeLabelTasks(id);
    }
}

export { LabelTasksService };
