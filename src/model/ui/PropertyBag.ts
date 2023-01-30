import { watermelondb } from "../db/database";
import PropertyDB from "../db/PropertyDB";
import { SchoolYear } from "./SchoolYear";
import { Subject } from "./Subject";
import { Topic } from "./Topic";

export class PropertyBag {
    subjects: Subject[];
    schoolYears: SchoolYear[];
    topics: Topic[];

    constructor(subjects: Subject[], schoolYears: SchoolYear[], topics: Topic[]) {
        this.subjects = subjects;
        this.schoolYears = schoolYears;
        this.topics = topics;
    }

    static async all(): Promise<PropertyBag> {
        const dbProperties: PropertyDB[] = await watermelondb
            .get<PropertyDB>('properties')
            .query()
            .fetch()
        
        return PropertyBag.createFromDB(dbProperties);
    }

    static async createFromDB(dbProperties: PropertyDB[]): Promise<PropertyBag> {
        let subjects = await Subject.createManyFromDB(dbProperties);
        let schoolYears = await SchoolYear.createManyFromDB(dbProperties);
        let topics = await Topic.createManyFromDB(dbProperties);

        return new PropertyBag(subjects, schoolYears, topics);
    }
}