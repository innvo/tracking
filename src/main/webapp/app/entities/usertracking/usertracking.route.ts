import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UsertrackingComponent } from './usertracking.component';
import { UsertrackingDetailComponent } from './usertracking-detail.component';
import { UsertrackingPopupComponent } from './usertracking-dialog.component';
import { UsertrackingDeletePopupComponent } from './usertracking-delete-dialog.component';

@Injectable()
export class UsertrackingResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const usertrackingRoute: Routes = [
    {
        path: 'usertracking',
        component: UsertrackingComponent,
        resolve: {
            'pagingParams': UsertrackingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usertrackings'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usertracking/:id',
        component: UsertrackingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usertrackings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usertrackingPopupRoute: Routes = [
    {
        path: 'usertracking-new',
        component: UsertrackingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usertrackings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usertracking/:id/edit',
        component: UsertrackingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usertrackings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usertracking/:id/delete',
        component: UsertrackingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usertrackings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
