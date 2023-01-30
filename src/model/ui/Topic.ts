import PropertyDB from '../db/PropertyDB';
import { Property } from './Property';

export class Topic extends Property {
    static createFromDB(property: PropertyDB) {
        return new Topic(property.id, property.name);
    }

    static async createManyFromDB(dbProperties: PropertyDB[]) {
        return dbProperties
            .filter(property => property.type === "topic")
            .map(Topic.createFromDB)
    }
}