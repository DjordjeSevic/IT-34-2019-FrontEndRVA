import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departman } from '../models/departman';
import { DEPARTMAN_URI } from '../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmanService {

  constructor(private httpClient: HttpClient) { }

  public getAllDepartmans(): Observable<any>{
    return this.httpClient.get(`${DEPARTMAN_URI}`);
  }

  public insertDepartman(departman: Departman): Observable<any>{
    departman.id = 150;
    return this.httpClient.post(`${DEPARTMAN_URI}`, departman);
  }

  public updateDepartman(departman: Departman): Observable<any>{
    return this.httpClient.put(`${DEPARTMAN_URI}`, departman);
  }

  public deleteDepartman(id: number): Observable<any>{
    return this.httpClient.delete(`${DEPARTMAN_URI}/${id}`);
  }
}
