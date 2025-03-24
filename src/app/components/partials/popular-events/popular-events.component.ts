import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Event} from "../../../models/event.model";
import {EventService} from "../../../services/event.service";
import {NgFor, NgIf} from "@angular/common";
import {EventModalComponent} from "../../pages/event-modal/event-modal.component";


@Component({
  selector: 'app-popular-events',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    EventModalComponent
  ],
  templateUrl: './popular-events.component.html',
  styleUrl: './popular-events.component.css'
})
export class PopularEventsComponent implements OnInit {
  latestEvents: Event[] = [];
  selectedEvent: any = null;
  isModalOpen = false;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.loadLatestEvents();
  }

  loadLatestEvents(): void {
    this.eventService.getLast3Events().subscribe((events) => {
      this.latestEvents = events;
    });
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

  openEventModal(event: any) {
    this.openModal();
    const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      modalElement.classList.remove('hidden');
    }
    this.selectedEvent = event;
  }

  openModal() {
    this.isModalOpen = true;
  }

}
