import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category.model';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8081/api/v1/categories';

  constructor(private http: HttpClient , private router: Router) {}

  createCategory(category: Category): Observable<Category> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<any>(this.apiUrl, category, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Create category error:', error);
          return throwError(() => error);
        })
      );
  }
}
