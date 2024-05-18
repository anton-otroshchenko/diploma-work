import {TasksRepository} from "../repositories/tasks.repository";

class TasksService {
    private tasksRepository: TasksRepository;

    constructor(tasksRepository: TasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async getTasks() {
        return this.tasksRepository.getTasks();
    }

    async addTasks(data:any){
        return this.tasksRepository.addTasks(data);
    }

    async updateTask(id:string,data:any){
        return this.tasksRepository.updateTask(id,data);
    }

    async removeTask(id:string){
        return this.tasksRepository.removeTasks(id);
    }
}

export { TasksService };
