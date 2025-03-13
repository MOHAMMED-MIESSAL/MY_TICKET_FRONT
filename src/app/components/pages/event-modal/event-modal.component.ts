import {Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";

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
export class EventModalComponent {

  @Input() event: any;

  @Input() showModal: boolean = false;  // Contrôle l'affichage du modal
  @Output() closeModalEvent = new EventEmitter<void>();  // Événement de fermeture

  closeEventModal() {
    this.closeModalEvent.emit();  // Notifie le parent de fermer le modal
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
