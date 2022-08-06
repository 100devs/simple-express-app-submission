// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Todo {
    constructor(
        public taskName: string,
        public description: string,
        public priority: string,
        public state: string,
        public id?: ObjectId) {}
}
