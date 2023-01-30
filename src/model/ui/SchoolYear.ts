import PropertyDB from '../db/PropertyDB';
import { Property } from './Property';

export class SchoolYear extends Property {
    static createFromDB(property: PropertyDB) {
        return new SchoolYear(property.id, property.name);
    }

    static async createManyFromDB(dbProperties: PropertyDB[]) {
        return dbProperties
            .filter(property => property.type === "school_year")
            .map(SchoolYear.createFromDB)
    }
}