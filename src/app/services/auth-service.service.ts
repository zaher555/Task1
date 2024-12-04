import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class authService {
  private url='http://127.0.0.1:8000/api';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
  });
  constructor(private http:HttpClient) { }
  login(loggedinUser:Login):Observable<Login>
  {
    return this.http.post<Login>(`${this.url}/user/login`,loggedinUser);
  }
  logout()
  {
    return this.http.post(`${this.url}/user/logout`,{},{ headers: this.headers });
  }
}
