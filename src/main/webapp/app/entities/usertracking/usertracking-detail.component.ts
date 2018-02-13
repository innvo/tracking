import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Usertracking } from './usertracking.model';
import { UsertrackingService } from './usertracking.service';

@Component({
    selector: 'jhi-usertracking-detail',
    templateUrl: './usertracking-detail.component.html'
})
export class UsertrackingDetailComponent implements OnInit, OnDestroy {

    usertracking: Usertracking;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usertrackingService: UsertrackingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsertrackings();
    }

    load(id) {
        this.usertrackingService.find(id)
            .subscribe((usertrackingResponse: HttpResponse<Usertracking>) => {
                this.usertracking = usertrackingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsertrackings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usertrackingListModification',
            (response) => this.load(this.usertracking.id)
        );
    }
}
