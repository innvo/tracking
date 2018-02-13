/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackingTestModule } from '../../../test.module';
import { UsertrackingComponent } from '../../../../../../main/webapp/app/entities/usertracking/usertracking.component';
import { UsertrackingService } from '../../../../../../main/webapp/app/entities/usertracking/usertracking.service';
import { Usertracking } from '../../../../../../main/webapp/app/entities/usertracking/usertracking.model';

describe('Component Tests', () => {

    describe('Usertracking Management Component', () => {
        let comp: UsertrackingComponent;
        let fixture: ComponentFixture<UsertrackingComponent>;
        let service: UsertrackingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackingTestModule],
                declarations: [UsertrackingComponent],
                providers: [
                    UsertrackingService
                ]
            })
            .overrideTemplate(UsertrackingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsertrackingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsertrackingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Usertracking(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.usertrackings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
