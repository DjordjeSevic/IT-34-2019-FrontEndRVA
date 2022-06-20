import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fakultet } from '../models/fakultet';
import { FAKULTET_URI } from '../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakultetService {

  constructor(private httpClient: HttpClient) { }

  public getAllFakultets(): Observable<any>{
    return this.httpClient.get(`${FAKULTET_URI}`);
  }

  public insertFakultet(fakultet: Fakultet): Observable<any>{
    fakultet.id = 150;
    return this.httpClient.post(`${FAKULTET_URI}`, fakultet);
  }

  public updateFakultet(fakultet: Fakultet): Observable<any>{
    return this.httpClient.put(`${FAKULTET_URI}`, fakultet);
  }

  public deleteFakultet(id: number): Observable<any>{
    return this.httpClient.delete(`${FAKULTET_URI}/${id}`);
  }
}
