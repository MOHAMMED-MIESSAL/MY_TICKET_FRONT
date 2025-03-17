import {Component , OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {ReservationService} from "../../../services/reservation.service";
import {Event} from "../../../models/event.model";
import {JwtPayload, jwtDecode} from 'jwt-decode';
import {Reservation} from "../../../models/reservation.model";
import {User} from "../../../models/user.model";


@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent implements OnInit {

  isLoggedIn = false;
  userId: string | null = null;
  @Input() event!: Event;
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  userRole: string | null = null;


  constructor(private authService: AuthService, private reservationService: ReservationService) {
    this.checkLoginStatus();
  }

  ngOnInit() {
    this.checkLoginStatus();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: JwtPayload & { role?: string; userId?: string } = jwtDecode(token);
        //const decodedToken: any = jwtDecode(token);
        this.userId = decodedToken.sub || null;  // Récupérer l'ID utilisateur du token

        this.userRole = decodedToken.role || null;
        console.log('User id:', this.userId);
      } catch (e) {
        console.error('Erreur lors du décodage du token:', e);
      }
    }
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  bookEvent() {
    if (!this.userId) {
      alert('Vous devez être connecté pour réserver.');
      return;
    }

    console.log('User ID:', this.userId); // Vérifier l'ID utilisateur
    console.log('Event ID:', this.event.id); // Vérifier l'ID de l'événement

    // Création d'une réservation avec l'ID utilisateur et l'ID de l'événement
    const reservation: Reservation = {
       // Laisse vide si le backend le génère
      numberOfTickets: 1,
      reservation_date: new Date().toISOString(), // Ajoute la date actuelle
      userId: this.userId, // Passe bien l'ID utilisateur sous forme de string
      eventId: this.event.id // Passe bien l'ID de l'événement sous forme de string

    };

    // Appeler le service de réservation
    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => {
        alert('Réservation réussie !');
        this.closeModalEvent.emit();  // Fermer le modal après réservation
        console.log('Reservation Data:', reservation);

      },
      error: (error) => {
        console.error('Erreur lors de la réservation:', error);
        alert('Erreur lors de la réservation.');
        console.log('Reservation Data:', reservation);

      }
    });

  }


  closeEventModal() {
    this.closeModalEvent.emit();
  }

  formatEventDate(startTimestamp: string): string {
    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: 'long'};
    const startDate = new Date(startTimestamp).toLocaleDateString('fr-FR', options);

    const parts = startDate.split(' ');
    const capitalizedMonth = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);

    return `${parts[0]} ${capitalizedMonth}`;
  }

  formatDateWithYear(startTimestamp: string): string {
    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: 'long', year: 'numeric'};
    const startDate = new Date(startTimestamp).toLocaleDateString('fr-FR', options);

    const parts = startDate.split(' ');
    const capitalizedMonth = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    const year = parts[2];

    return `${parts[0]} ${capitalizedMonth} ${year}`;
  }


}
