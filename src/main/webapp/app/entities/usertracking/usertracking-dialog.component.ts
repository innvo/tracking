import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Usertracking } from './usertracking.model';
import { UsertrackingPopupService } from './usertracking-popup.service';
import { UsertrackingService } from './usertracking.service';

@Component({
    selector: 'jhi-usertracking-dialog',
    templateUrl: './usertracking-dialog.component.html'
})
export class UsertrackingDialogComponent implements OnInit {

    usertracking: Usertracking;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private usertrackingService: UsertrackingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usertracking.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usertrackingService.update(this.usertracking));
        } else {
            this.subscribeToSaveResponse(
                this.usertrackingService.create(this.usertracking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Usertracking>>) {
        result.subscribe((res: HttpResponse<Usertracking>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Usertracking) {
        this.eventManager.broadcast({ name: 'usertrackingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-usertracking-popup',
    template: ''
})
export class UsertrackingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usertrackingPopupService: UsertrackingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usertrackingPopupService
                    .open(UsertrackingDialogComponent as Component, params['id']);
            } else {
                this.usertrackingPopupService
                    .open(UsertrackingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
