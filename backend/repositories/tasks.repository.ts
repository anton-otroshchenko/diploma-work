import { Tasks } from "../models/tasks.model";
class TasksRepository {
    private model: typeof Tasks;

    constructor(model: typeof Tasks) {
        this.model = model;
    }

    async getTasks() {
        return this.model.query();
    }

    async addTasks(data:any){
        return this.model.query().insert({
            title: data.title,
            details: data.details,
            columnId: data.columnId
        });
    }

    async updateTask(id:string, data:any) {
        return this.model.query().patchAndFetchById(id, {
            title: data.title,
            details: data.details,
            columnId: data.columnId
        });
    }
    async removeTasks(id: string) {
        return this.model.query().deleteById(id);
    }
}

export { TasksRepository };
