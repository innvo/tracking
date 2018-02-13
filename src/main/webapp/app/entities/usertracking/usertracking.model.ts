import { BaseEntity } from './../../shared';

export class Usertracking implements BaseEntity {
    constructor(
        public id?: number,
        public user?: string,
        public route?: string,
        public restcall?: string,
        public timetamp?: any,
    ) {
    }
}
