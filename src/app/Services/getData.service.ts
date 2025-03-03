import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../Types/User';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',

})
export class getData {
  constructor(private http: HttpClient, private router: Router) { }
// get user details name' id and token from server.
  getUserById(user: User): Observable<any> {
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post("https://matriculationexamserver.onrender.com/Login/Login", 
      JSON.stringify({
        id: (user.id)?.toString(),
        className: user.className,
        classNameNumber: user.classNameNumber
      }), { headers }
    ).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('id', response.data.id);
        this.router.navigate(['/matriculation-exam']);
        console.log(response,'response');
        
        return response;
      }),
      catchError(error => {
        alert("שגיאה, נסי שוב מאוחר יותר.");
        console.error('Error occurred:', error);
        console.log(error,'error');

        return throwError(error);
      })
    );
  }
// get data Exam by user 
  async getExamsByUser(){
   const token = localStorage.getItem('token') || '';
    if (!token) return throwError('Token is empty');
    
    return this.http
      .get(`https://matriculationexamserver.onrender.com/Login/Login/GetData?token=${token}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map((response: any) => {
          console.log('Response:', response);
          return response;
        }),
        catchError((error) => {
          alert("שגיאה, נסי שוב מאוחר יותר.");

          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  
  }

}
