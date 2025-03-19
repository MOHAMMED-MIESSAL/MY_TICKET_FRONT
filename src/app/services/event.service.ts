import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Event} from "../models/event.model";
import {HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class EventService {


  constructor(private http: HttpClient, private router: Router) {
  }

  private apiUrl = 'http://localhost:8081/api/v1/events';

  getAllEvents(page: number = 0, size: number = 10): Observable<{
    content: Event[],
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
      content: Event[],
      totalElements: number,
      totalPages: number
    }>(url, {headers: httpHeaders})
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des événements :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des événements.'));
        })
      );

  }


  getAllEvents2(page: number = 0, size: number = 10, title: string = ''): Observable<{
    content: Event[],
    totalElements: number,
    totalPages: number
  }> {
    const token = localStorage.getItem('token');

    const httpHeaders = token
      ? new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      : new HttpHeaders({'Content-Type': 'application/json'});

    // Construire l'URL avec title optionnel
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    if (title) {
      url = `${this.apiUrl}/search?title=${encodeURIComponent(title)}&page=${page}&size=${size}`;
    }

    return this.http.get<{
      content: Event[],
      totalElements: number,
      totalPages: number
    }>(url, {headers: httpHeaders})
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des événements :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des événements.'));
        })
      );
  }


  getEventsByUser(userId: string, page: number = 0, size: number = 10): Observable<{
    content: Event[],
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
    const url = `${this.apiUrl}/user/${userId}?page=${page}&size=${size}`;

    return this.http.get<{
      content: Event[],
      totalElements: number,
      totalPages: number
    }>(url, {headers: httpHeaders})
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des événements :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des événements.'));
        })
      );

  }

  getEventById(eventId: string): Observable<Event> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<any>(`${this.apiUrl}/${eventId}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Get event by id error:', error);
          return throwError(() => error);
        })
      );
  }


  deleteEvent(eventId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.delete<any>(`${this.apiUrl}/${eventId}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Delete event error:', error);
          return throwError(() => error);
        })
      );

  }

  createEvent(event: Event): Observable<Event> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<any>(this.apiUrl, event, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Create event error:', error);
          return throwError(() => error);
        })
      );
  }

  updateEvent(id: string, event: Event): Observable<Event> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, event, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Update event error:', error);
          return throwError(() => error);
        })
      );
  }

}
