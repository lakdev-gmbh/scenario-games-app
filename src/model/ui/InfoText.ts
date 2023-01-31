import InfoTextDB from "../db/InfoTextDB";
import { TaskGroup } from "./TaskGroup";
import { TaskGroupElement } from "./TaskGroupElement";

export class InfoText extends TaskGroupElement {
    body: string;

    constructor(title: string, weight: number, body: string, type: string, taskGroup: TaskGroup) {
        super(title, body, weight, taskGroup, type);
        this.body = body;
    }
    
    static async createFromDB(dbInfoText: InfoTextDB) {
        return new InfoText(
            dbInfoText.title,
            dbInfoText.weight,
            dbInfoText.body,
            dbInfoText.type,
            await dbInfoText.taskGroup
        );
    }
    

    static async createManyFromDB(dbInfoTexts: InfoTextDB[]) {
        let infoTexts: InfoText[] = [];

        for (let i = 0; i < dbInfoTexts.length; i++) {
            const infoTextObject = await InfoText.createFromDB(dbInfoTexts[i]);
            infoTexts.push(infoTextObject);
        }

        return infoTexts;
    }

}