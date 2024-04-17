import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../student-list/student-list.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  url = "https://studentserver-studentlist.up.railway.app";


  bulkDelete(param:HttpParams)
{
  return this.http.put(`${this.url}/student/bulkDelete`,param);
}

create(student:Student)
{
  return this.http.post(`${this.url}/student/`,student)
}

getStudent():Observable<Student[]>
{
  return this.http.get<Student[]>(`${this.url}/student/`)
}

deleteStudent(id:number){
  return this.http.delete(`${this.url}/student/${id}`)
}
}
