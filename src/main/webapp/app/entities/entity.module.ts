import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrackingPersonModule } from './person/person.module';
import { TrackingUsertrackingModule } from './usertracking/usertracking.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TrackingPersonModule,
        TrackingUsertrackingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackingEntityModule {}
