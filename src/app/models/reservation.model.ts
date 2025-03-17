import { User } from './user.model';
import { Event } from './event.model';

export interface Reservation {
  id?: string;
  numberOfTickets: number;
  reservation_date: string;
  userId: string;
  eventId: string;
  user?: User;  // Optionnel pour éviter les erreurs si non chargé
  event?: Event;
}

