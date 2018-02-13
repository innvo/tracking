import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Usertracking } from './usertracking.model';
import { UsertrackingService } from './usertracking.service';

@Injectable()
export class UsertrackingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private usertrackingService: UsertrackingService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.usertrackingService.find(id)
                    .subscribe((usertrackingResponse: HttpResponse<Usertracking>) => {
                        const usertracking: Usertracking = usertrackingResponse.body;
                        usertracking.timetamp = this.datePipe
                            .transform(usertracking.timetamp, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.usertrackingModalRef(component, usertracking);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.usertrackingModalRef(component, new Usertracking());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    usertrackingModalRef(component: Component, usertracking: Usertracking): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.usertracking = usertracking;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
