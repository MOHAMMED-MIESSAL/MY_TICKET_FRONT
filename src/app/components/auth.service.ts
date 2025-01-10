import {Injectable,inject} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  private authUrl = 'http://localhost:8081/api/v1/auth';

  constructor(private http: HttpClient) {}


  getUserRole(): Observable<string | null> {
    const token = localStorage.getItem('token');
    if (!token) return of(null);
    const url = 'http://localhost:8081/api/v1/auth/user-info';
    return this.http.get<{ role: string }>(url, {
      headers: {Authorization: `Bearer ${token}`}
    }).pipe(
      map((response) => response.role),
      catchError(() => of(null))
    );
  }


  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {email, password};
    return this.http.post(this.authUrl + "/login", body, {headers});
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
