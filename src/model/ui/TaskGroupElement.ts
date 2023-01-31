import { TaskGroup } from "./TaskGroup";

export class TaskGroupElement {
    title: string;
    text: string;
    weight: number;
    taskGroup: TaskGroup;
    type: string;

    constructor(title: string, text: string,  weight: number, taskGroup: TaskGroup, type: string) {
        this.title = title;
        this.text = text;
        this.weight = weight;
        this.taskGroup = taskGroup;
        this.type = type;
    }
}