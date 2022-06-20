import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status';
import { STATUS_URI } from '../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }

  public getAllStatus(): Observable<any>{
    return this.httpClient.get(`${STATUS_URI}`);
  }

  public insertStatus(status: Status): Observable<any>{
    status.id = 150;
    return this.httpClient.post(`${STATUS_URI}`, status);
  }

  public updateStatus(status: Status): Observable<any>{
    return this.httpClient.put(`${STATUS_URI}`, status);
  }

  public deleteStatus(id: number): Observable<any>{
    return this.httpClient.delete(`${STATUS_URI}/${id}`);
  }
}
