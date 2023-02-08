import { TaskGroup } from "./TaskGroup";

export class TaskGroupElement {
    id: string;
    title: string;
    text: string;
    weight: number;
    taskGroup: TaskGroup;
    type: string;

    constructor(id: string, title: string, text: string,  weight: number, taskGroup: TaskGroup, type: string) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.weight = weight;
        this.taskGroup = taskGroup;
        this.type = type;
    }
}