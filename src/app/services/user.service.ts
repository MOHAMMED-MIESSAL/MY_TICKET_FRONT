import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(private http: HttpClient, private router: Router) {
  }

  private apiUrl = 'http://localhost:8081/api/v1/users';


  getAllUsers(page: number = 0, size: number = 10): Observable<{
    content: User[],
    totalElements: number,
    totalPages: number
  }> {
    const token = localStorage.getItem('token');

    const httpHeaders = token ?
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      : new HttpHeaders({'Content-Type': 'application/json'});

    const url = `${this.apiUrl}?page=${page}&size=${size}`;


    return this.http.get<{
      content: User[],
      totalElements: number,
      totalPages: number
    }>(url, {headers: httpHeaders})
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des utilisateurs :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des utilisateurs.'));
        })
      );

  }


  createUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    const httpHeaders = token ?
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })

      : new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<User>(this.apiUrl, user, {headers: httpHeaders})
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la création de l\'utilisateur.'));
        })
      );
  }


  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const httpHeaders = token ?
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      : new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, {headers: httpHeaders})
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la suppression de l\'utilisateur :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la suppression de l\'utilisateur.'));
        })
      );
  }


  updateUserStatus(id: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.put<any>(`${this.apiUrl}/${id}`, userData, httpOptions)

      .pipe(
        catchError(error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.'));
        })
      );
  }

  getUserById(id: string): Observable<User> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<User>(`${this.apiUrl}/${id}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la récupération de l\'utilisateur.'));
        })
      );
  }

}
