import PropertyDB from '../db/PropertyDB';
import { Property } from './Property';

export class Subject extends Property {
    static createFromDB(property: PropertyDB) {
        return new Subject(property.id, property.name);
    }

    static async createManyFromDB(dbProperties: PropertyDB[]) {
        return dbProperties
            .filter(property => property.type === "subject")
            .map(Subject.createFromDB)
    }
}