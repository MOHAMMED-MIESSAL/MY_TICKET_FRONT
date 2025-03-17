import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../dashboard/components/header/header.component";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Router} from "@angular/router";
import {ReservationService} from "../../../services/reservation.service";
import {JwtPayload, jwtDecode} from 'jwt-decode';
import {Reservation} from "../../../models/reservation.model";


@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    NgForOf,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationComponent implements OnInit {

  userId: string | null = null;

  totalElements = 0;
  reservations: Reservation[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20];


  constructor(private reservationService: ReservationService, private router: Router) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: JwtPayload & { role?: string; userId?: string } = jwtDecode(token);
        this.userId = decodedToken.sub || null; // Get the user id from the token

        if (this.userId) {
          console.log('User id:', this.userId);
          this.loadReservations(this.userId, this.currentPage, this.pageSize);
        } else {
          this.router.navigate(['/']);
        }
      } catch (e) {
        console.error('Error decoding token:', e);
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  loadReservations(userId: string, page: number, size: number): void {
    this.reservationService.getAllReservationsByUser(userId, page, size)
      .subscribe(
        (response: any) => { // Ajout explicite du type `any`
          this.reservations = response.content;
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
        },
        error => {
          console.error('Error loading reservations:', error);
        }
      );
  }



}
