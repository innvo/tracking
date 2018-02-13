/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackingTestModule } from '../../../test.module';
import { UsertrackingDetailComponent } from '../../../../../../main/webapp/app/entities/usertracking/usertracking-detail.component';
import { UsertrackingService } from '../../../../../../main/webapp/app/entities/usertracking/usertracking.service';
import { Usertracking } from '../../../../../../main/webapp/app/entities/usertracking/usertracking.model';

describe('Component Tests', () => {

    describe('Usertracking Management Detail Component', () => {
        let comp: UsertrackingDetailComponent;
        let fixture: ComponentFixture<UsertrackingDetailComponent>;
        let service: UsertrackingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackingTestModule],
                declarations: [UsertrackingDetailComponent],
                providers: [
                    UsertrackingService
                ]
            })
            .overrideTemplate(UsertrackingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsertrackingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsertrackingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Usertracking(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.usertracking).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
