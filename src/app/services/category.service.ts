import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Category} from '../models/category.model';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8081/api/v1/categories';

  constructor(private http: HttpClient, private router: Router) {
  }


  getAllCategories(page: number = 0, size: number = 10): Observable<{
    content: Category[],
    totalElements: number,
    totalPages: number
  }> {
    const token = localStorage.getItem('token');

    // Vérifier si le token est présent et créer les en-têtes
    const httpHeaders = token ?
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Ajout du token dans les en-têtes
      })
      : new HttpHeaders({'Content-Type': 'application/json'});  // Sans token si non présent

    const url = `${this.apiUrl}?page=${page}&size=${size}`;

    return this.http.get<{
      content: Category[],
      totalElements: number,
      totalPages: number
    }>(url, {headers: httpHeaders})
      .pipe(
        catchError(error => {
          // Gestion des erreurs détaillées
          console.error('Erreur lors de la récupération des catégories :', error);

          // Vérifier si l'erreur est liée à l'absence de token ou autre
          if (error.status === 401) {
            // Exemple de redirection ou d'affichage d'un message d'erreur
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }

          // Autres erreurs génériques
          return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des catégories.'));
        })
      );
  }


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


  deleteCategory(categoryId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.delete<any>(`${this.apiUrl}/${categoryId}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Delete category error:', error);
          return throwError(() => error);
        })
      );
  }


  getCategoryById(categoryId: string): Observable<Category> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<Category>(`${this.apiUrl}/${categoryId}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Get category by id error:', error);
          return throwError(() => error);
        })
      );
  }

  updateCategory(id: string, categoryData: any): Observable<Category> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.put<Category>(`${this.apiUrl}/${id}`, categoryData, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Update category error:', error);
          return throwError(() => error);
        })
      );
  }

}
