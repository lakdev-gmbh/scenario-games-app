import TaskDB from "../db/TaskDB";
import { TaskGroup } from "./TaskGroup";
import { TaskGroupElement } from "./TaskGroupElement";

export class Task extends TaskGroupElement {
    question: string;
    correctAnswer: string;
    possibleAnswers: string[];
    options: string[];

    constructor(title: string, weight: number, question: string, correctAnswer: string, possibleAnswers: string[], type: string, options: string[], taskGroup: TaskGroup) {
        super(title, question, weight, taskGroup, type);
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.possibleAnswers = possibleAnswers;
        this.options = options;
    }
    
        
    static async createFromDB(dbTask: TaskDB) {
        return new Task(
            dbTask.title,
            dbTask.weight,
            dbTask.question,
            dbTask.correct_answer,
            dbTask.possible_answers,
            dbTask.type,
            dbTask.options,
            await dbTask.taskGroup
        );
    }
    

    static async createManyFromDB(dbTask: TaskDB[]) {
        let tasks: Task[] = [];

        for (let i = 0; i < dbTask.length; i++) {
            const taskObject = await Task.createFromDB(dbTask[i]);
            tasks.push(taskObject);
        }

        return tasks;
    }

}