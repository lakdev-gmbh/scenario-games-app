import { Q } from "@nozbe/watermelondb";
import { watermelondb } from "../db/database";
import TaskDB from "../db/TaskDB";
import UserCompletedTaskDB from "../db/UserCompletedTaskDB";
import { TaskGroup } from "./TaskGroup";
import { TaskGroupElement } from "./TaskGroupElement";

export class Task extends TaskGroupElement {
    question: string;
    correctAnswer: string;
    possibleAnswers: Object[];
    options: string[];

    constructor(id: string, title: string, weight: number, question: string, correctAnswer: string, possibleAnswers: Object[], type: string, options: string[], taskGroup: TaskGroup) {
        super(id, title, question, weight, taskGroup, type);
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.possibleAnswers = possibleAnswers;
        this.options = options;
    }


    static async createFromDB(dbTask: TaskDB) {
        return new Task(
            dbTask.id,
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

    getOrderAnswers(): any[] {
        // TODO: Order randomly without breaking DragDrop
        const orderAnswers =  this.possibleAnswers
            // .map(value => ({ value, sort: Math.random() }))
            // .sort((a, b) => a.sort - b.sort)
            .map(( value ) => value.answer)

        return orderAnswers;
    }

    getOrderSolution(): any[] {
        const orderSolution = this.possibleAnswers
            .filter((value) => value.order != -1)
            .sort((a, b) => a.order - b.order)
            .map((value) => value.answer)

        return orderSolution;
    }

    getCorrectAnswer(): string {
        switch (this.type) {
            case "multiple_choice":
            case "multiple_choice_image":
                return this.possibleAnswers.filter(answer => answer.is_correct).map(answer => answer.answer).join(", ");
            case "drag_drop":
                return this.getOrderSolution().join(", ");
            case "text":
                return this.correctAnswer;
            default:
                return this.correctAnswer;
        }
    }


    async saveAnswer(correctAnswer: string, correct: boolean) {
        await watermelondb.get<TaskDB>('tasks').find(this.id).then(async (task: TaskDB) => {
            await task.addUserAnswer(correctAnswer, correct);
        })
    }

    async getLatestUserAnswer(): Promise<UserCompletedTaskDB|undefined> {
        const dbTask = await watermelondb.get<TaskDB>('tasks').find(this.id)
        const userAnswers = await watermelondb.get<UserCompletedTaskDB>('user_completed_tasks').query(
            Q.where("task_watermelon_id", dbTask.id)
        ).fetch()
        if (userAnswers.length == 0) {
            return undefined;
        } 
        const userAnswer = userAnswers.pop()
        return userAnswer;
    }
}