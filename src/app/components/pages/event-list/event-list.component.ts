import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Router, RouterLink} from "@angular/router";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {Event} from "../../../models/event.model";
import {EventService} from "../../../services/event.service";
import {EventModalComponent} from "../event-modal/event-modal.component";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    NgClass,
    NgForOf,
    DatePipe,
    EventModalComponent
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  protected readonly Math = Math;

  totalElements = 0;
  events: Event[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20];
  showModal = false;
  isModalOpen = false;
  selectedEvent: Event | null = null;


  constructor(private eventService: EventService, private router: Router) {
  }


  ngOnInit() {
    this.setupModalHandlers();
    this.loadEvents(this.currentPage, this.pageSize);
  }


  openModal()   {
    this.isModalOpen = true;
  }

  loadEvents(page: number, size: number): void {
    this.eventService.getAllEvents(page, size).subscribe({
      next: (data) => {
        this.events = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        console.log('Events:', this.events);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
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

  closeModal() {
    this.showModal = false;
  }

  openEventModal() {
    this.openModal();
    const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      modalElement.classList.remove('hidden');
    }
  }

  setupModalHandlers() {
    // On utilise setTimeout pour s'assurer que les éléments DOM sont bien chargés
    setTimeout(() => {
      const modalElement = document.getElementById('eventModal');
      const modalContentElement = document.querySelector('#eventModal > div');

      if (modalElement) {
        // Fermer le modal quand on clique en dehors du contenu
        modalElement.addEventListener('click', (e) => {
          if (e.target === modalElement) {
            this.closeModal();
            modalElement.classList.add('hidden');
          }
        });
      }

      if (modalContentElement) {
        // Empêcher la propagation des clics à l'intérieur du modal
        modalContentElement.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }
    });
  }


  /*
Methods to navigate through pages of categories
*/

  goToPreviousPage(): void {
    if (this.currentPage > 0
    ) {
      this.currentPage--;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1
    ) {
      this.currentPage++;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }

  changePage(page: number): void {
    if (page !== this.currentPage
    ) {
      this.currentPage = page;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadEvents(this.currentPage, this.pageSize);
  }

  get pages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i);
  }
}
