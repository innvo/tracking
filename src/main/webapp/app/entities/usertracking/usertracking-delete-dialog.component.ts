import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Usertracking } from './usertracking.model';
import { UsertrackingPopupService } from './usertracking-popup.service';
import { UsertrackingService } from './usertracking.service';

@Component({
    selector: 'jhi-usertracking-delete-dialog',
    templateUrl: './usertracking-delete-dialog.component.html'
})
export class UsertrackingDeleteDialogComponent {

    usertracking: Usertracking;

    constructor(
        private usertrackingService: UsertrackingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usertrackingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usertrackingListModification',
                content: 'Deleted an usertracking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usertracking-delete-popup',
    template: ''
})
export class UsertrackingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usertrackingPopupService: UsertrackingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usertrackingPopupService
                .open(UsertrackingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
