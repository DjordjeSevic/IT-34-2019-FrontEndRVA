import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { STUDENT_URI, STUDENT_FOR_DEPARTMAN_URI } from '../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  public getStudentsByDepartman(idDepartman: number): Observable<any>{
    return this.httpClient.get(`${STUDENT_FOR_DEPARTMAN_URI}/${idDepartman}`);
  }

  public insertStudent(student: Student): Observable<any>{
    student.id = 150;
    return this.httpClient.post(`${STUDENT_URI}`, student);
  }

  public updateStudent(student: Student): Observable<any>{
    return this.httpClient.put(`${STUDENT_URI}`, student);
  }

  public deleteStudent(id: number): Observable<any>{
    return this.httpClient.delete(`${STUDENT_URI}/${id}`);
  }
}
