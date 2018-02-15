import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Angulartics2Piwik } from 'angulartics2/piwik';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
	
	tracking: any;
	
    constructor(
        private titleService: Title,
        private router: Router, 
		private angulartics2Piwik: Angulartics2Piwik,
		private angulartics2: Angulartics2
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'trackingApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
                
                console.log(this.angulartics2);		
		  		this.tracking = this.angulartics2 ;
		  		console.log(this.tracking.tracker.router.url);
            }
        });
        
        
    }
}
