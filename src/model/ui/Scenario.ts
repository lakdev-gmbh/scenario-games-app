import { watermelondb } from "../db/database";
import ScenarioDB from "../db/ScenarioDB";
import { PropertyBag } from "./PropertyBag";
import { SchoolYear } from "./SchoolYear";
import { Subject } from "./Subject";
import { Topic } from "./Topic";

export class Scenario {

    id: string;
    title: string;
    subjects: Subject[];
    topics: Topic[];
    schoolYears: SchoolYear[];
    description: string;
    image: string;

    constructor(id: string, title: string, subjects: Subject[], topics: Topic[], schoolYears: SchoolYear[], description: string, image: string) {
        this.id = id;
        this.title = title;
        this.subjects = subjects;
        this.topics = topics;
        this.schoolYears = schoolYears;
        this.description = description;
        this.image = image;
    }

    static async createFromDB(scenario: ScenarioDB): Promise<Scenario> {
        // Get the properties for the scenario from the database
        let scenarioProperties = await scenario.properties;
        let propertyBag = await PropertyBag.createFromDB(scenarioProperties);

        return new Scenario(
            scenario.id,
            scenario.title,
            propertyBag.subjects,
            propertyBag.topics,
            propertyBag.schoolYears,
            scenario.description,
            scenario.image
        );
    }

    static async createManyFromDB(dbScenarios: ScenarioDB[]): Promise<Scenario[]> {
        let scenarios: Scenario[] = [];

        for (let i = 0; i < dbScenarios.length; i++) {
            const scenarioObject = await Scenario.createFromDB(dbScenarios[i]);
            scenarios.push(scenarioObject);
        }

        return scenarios;
    }

    static async all(): Promise<Scenario[]> {
        const dbScenarios: ScenarioDB[] = await watermelondb
        .get('scenarios')
        .query()
        .fetch()

        let scenarios: Scenario[] = [];

        for (let i = 0; i < dbScenarios.length; i++) {
            const scenarioObject = await Scenario.createFromDB(dbScenarios[i]);
            scenarios.push(scenarioObject);
        }

        return scenarios;
    }
}