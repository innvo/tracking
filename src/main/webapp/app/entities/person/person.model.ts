import { BaseEntity } from './../../shared';

export class Person implements BaseEntity {
    constructor(
        public id?: number,
        public firstname?: string,
        public lastname?: string,
    ) {
    }
}
