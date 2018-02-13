import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackingSharedModule } from '../../shared';
import {
    UsertrackingService,
    UsertrackingPopupService,
    UsertrackingComponent,
    UsertrackingDetailComponent,
    UsertrackingDialogComponent,
    UsertrackingPopupComponent,
    UsertrackingDeletePopupComponent,
    UsertrackingDeleteDialogComponent,
    usertrackingRoute,
    usertrackingPopupRoute,
    UsertrackingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usertrackingRoute,
    ...usertrackingPopupRoute,
];

@NgModule({
    imports: [
        TrackingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsertrackingComponent,
        UsertrackingDetailComponent,
        UsertrackingDialogComponent,
        UsertrackingDeleteDialogComponent,
        UsertrackingPopupComponent,
        UsertrackingDeletePopupComponent,
    ],
    entryComponents: [
        UsertrackingComponent,
        UsertrackingDialogComponent,
        UsertrackingPopupComponent,
        UsertrackingDeleteDialogComponent,
        UsertrackingDeletePopupComponent,
    ],
    providers: [
        UsertrackingService,
        UsertrackingPopupService,
        UsertrackingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackingUsertrackingModule {}
