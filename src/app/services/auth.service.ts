import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/v1/auth';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Register error:', error);
          return throwError(() => error);
        })
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
