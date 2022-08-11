import { ObjectId } from "mongodb";
export default class Todo {
    taskName: string;
    description: string;
    priority: string;
    state: string;
    id?: ObjectId | undefined;
    constructor(taskName: string, description: string, priority: string, state: string, id?: ObjectId | undefined);
}
//# sourceMappingURL=todo.d.ts.map