import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Angulartics2Piwik } from 'angulartics2/piwik';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';

import { Usertracking } from '../../entities/usertracking/usertracking.model';
import { UsertrackingService } from '../../entities/usertracking/usertracking.service';
import { Account, LoginModalService, Principal } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';


@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
	
	tracking: any;
	
	
	
	account: Account;
	
	isSaving: boolean;
	
    constructor(
        private usertrackingService: UsertrackingService,
        private titleService: Title,
        private router: Router, 
		private angulartics2Piwik: Angulartics2Piwik,
		private angulartics2: Angulartics2,
		private principal: Principal,
        private eventManager: JhiEventManager
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'trackingApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        let usertracking= new Usertracking();
        console.log(usertracking)
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
                console.log("All angulartics2 output ")
                console.log(this.angulartics2);		
		  		this.tracking = this.angulartics2 ;
		  		console.log("current route")
		  		console.log(this.tracking.tracker.router.url);
		  		console.log(usertracking)
		  		usertracking.route = this.tracking.tracker.router.url;
		  		usertracking.restcall = this.tracking.tracker.router.url;
		  		this.subscribeToSaveResponse(
                         this.usertrackingService.create(usertracking));		  		
            }
        });   
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Usertracking>>) {
        result.subscribe((res: HttpResponse<Usertracking>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Usertracking) {
        this.eventManager.broadcast({ name: 'usertrackingListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
