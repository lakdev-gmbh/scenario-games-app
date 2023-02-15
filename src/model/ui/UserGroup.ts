import UserGroupDB from "../db/UserGroupDB";
import { Scenario } from "./Scenario";

export class UserGroup {
    id: string;
    title: string;
    code: string;
    scenarios: Scenario[];

    constructor(id: string, title: string, code: string, scenarios: Scenario[]) {
        this.id = id;
        this.title = title;
        this.code = code;
        this.scenarios = scenarios;
    }

    static async createFromDB(userGroupDB: UserGroupDB): Promise<UserGroup> {
        const dbScenarios = await userGroupDB.publicScenarios;
        const scenarios = await Scenario.createManyFromDB(dbScenarios);
        return new UserGroup(
            userGroupDB.id,
            userGroupDB.title,
            userGroupDB.code,
            scenarios
        );
    }

}