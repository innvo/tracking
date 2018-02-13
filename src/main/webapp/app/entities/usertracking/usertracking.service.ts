import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Usertracking } from './usertracking.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Usertracking>;

@Injectable()
export class UsertrackingService {

    private resourceUrl =  SERVER_API_URL + 'api/usertrackings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(usertracking: Usertracking): Observable<EntityResponseType> {
        const copy = this.convert(usertracking);
        return this.http.post<Usertracking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(usertracking: Usertracking): Observable<EntityResponseType> {
        const copy = this.convert(usertracking);
        return this.http.put<Usertracking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Usertracking>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Usertracking[]>> {
        const options = createRequestOption(req);
        return this.http.get<Usertracking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Usertracking[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Usertracking = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Usertracking[]>): HttpResponse<Usertracking[]> {
        const jsonResponse: Usertracking[] = res.body;
        const body: Usertracking[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Usertracking.
     */
    private convertItemFromServer(usertracking: Usertracking): Usertracking {
        const copy: Usertracking = Object.assign({}, usertracking);
        copy.timetamp = this.dateUtils
            .convertDateTimeFromServer(usertracking.timetamp);
        return copy;
    }

    /**
     * Convert a Usertracking to a JSON which can be sent to the server.
     */
    private convert(usertracking: Usertracking): Usertracking {
        const copy: Usertracking = Object.assign({}, usertracking);

        copy.timetamp = this.dateUtils.toDate(usertracking.timetamp);
        return copy;
    }
}
