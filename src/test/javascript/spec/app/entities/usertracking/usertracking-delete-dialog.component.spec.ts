/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackingTestModule } from '../../../test.module';
import { UsertrackingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/usertracking/usertracking-delete-dialog.component';
import { UsertrackingService } from '../../../../../../main/webapp/app/entities/usertracking/usertracking.service';

describe('Component Tests', () => {

    describe('Usertracking Management Delete Component', () => {
        let comp: UsertrackingDeleteDialogComponent;
        let fixture: ComponentFixture<UsertrackingDeleteDialogComponent>;
        let service: UsertrackingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackingTestModule],
                declarations: [UsertrackingDeleteDialogComponent],
                providers: [
                    UsertrackingService
                ]
            })
            .overrideTemplate(UsertrackingDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsertrackingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsertrackingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
