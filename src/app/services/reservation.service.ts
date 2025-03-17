import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Reservation} from "../models/reservation.model";
import {HttpHeaders} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})

export class ReservationService {


  constructor(private http: HttpClient, private router: Router) {
  }


  private apiUrl = 'http://localhost:8081/api/v1/reservations';


  createReservation(reservation: Reservation): Observable<Reservation> {
    const token = localStorage.getItem('token');
    const httpHeaders = token ? new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }) : new HttpHeaders({'Content-Type': 'application/json'});

    // Envoi de la réservation à l'API backend
    return this.http.post<Reservation>(this.apiUrl, reservation, { headers: httpHeaders });
  }


  getAllReservationsByUser(userId: string, page: number = 0, size: number = 10): Observable<{
    content: Reservation[],
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
      content: Reservation[],
      totalElements: number,
      totalPages: number
    }>(url, {headers: httpHeaders})
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des réservations :', error);
          if (error.status === 401) {
            return throwError(() => new Error('Token expiré ou non valide. Veuillez vous reconnecter.'));
          }
          return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des réservations.'));
        })
      );
  }


}
