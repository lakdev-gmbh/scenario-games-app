import TaskGroupDB from "../db/TaskGroupDB";
import { InfoText } from "./InfoText";
import { Scenario } from "./Scenario";
import { Task } from "./Task";
import { TaskGroupElement } from "./TaskGroupElement";

export class TaskGroup {
    title: string;
    weight: number;
    taskGroupElements: TaskGroupElement[];
    scenario: Scenario;

    constructor(title: string, weight: number, taskGroupElements: TaskGroupElement[], scenario: Scenario) {
        this.title = title;
        this.weight = weight;
        this.taskGroupElements = taskGroupElements;
        this.scenario = scenario;
    }

    static async createFromDB(dbTaskGroup: TaskGroupDB): Promise<TaskGroup> {
        let dbTaskGroupInfoTexts = await dbTaskGroup.infoTexts;
        let taskGroupInfoTexts = await InfoText.createManyFromDB(dbTaskGroupInfoTexts);

        let dbTaskGroupTasks = await dbTaskGroup.tasks;
        let taskGroupTasks = await Task.createManyFromDB(dbTaskGroupTasks);


        let taskGroupElements:(InfoText|Task)[] = [];
        taskGroupElements.push(...taskGroupInfoTexts)
        taskGroupElements.push(...taskGroupTasks);
        taskGroupElements.sort((a, b) => (a.weight > b.weight) ? 1 : -1);

        return new TaskGroup(
            dbTaskGroup.title,
            dbTaskGroup.weight,
            taskGroupElements,
            await dbTaskGroup.scenario
        );
    }
}