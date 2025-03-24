import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Event} from "../../../models/event.model";
import {EventService} from "../../../services/event.service";
import {EventModalComponent} from "../event-modal/event-modal.component";
import {FormsModule} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category.model";


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    EventModalComponent,
    FormsModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  protected readonly Math = Math;

  totalElements = 0;
  events: Event[] = [];
  searchTerm: string = '';
  currentPage = 0;
  totalPages = 0;
  pageSize = 9;
  showModal = false;
  isModalOpen = false;
  selectedEvent: any = null;
  categories: Category[] = [];
  selectedCategory: string | null = null;
  startDate: string = '';
  endDate: string = '';


  constructor(private eventService: EventService, private router: Router, private categoryService: CategoryService) {
  }


  ngOnInit() {
    this.setupModalHandlers();
    this.loadEvents(this.currentPage, this.pageSize);
    this.loadCategories();
  }


  openModal() {
    this.isModalOpen = true;
  }

  loadEvents(page: number, size: number, searchTerm: string = ''): void {
    this.eventService.getAllEvents2(page, size, searchTerm).subscribe({
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

  // Fonction appelée lors du clic sur le bouton de recherche
  onSearchClick(): void {
    this.loadEvents(0, this.pageSize, this.searchTerm);
  }

  // Méthode pour réinitialiser la recherche
  resetSearch(): void {
    this.searchTerm = '';  // Réinitialiser le terme de recherche
    this.loadEvents(0, this.pageSize);  // Recharger les événements avec les valeurs par défaut
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.content; // Récupère uniquement le tableau des catégories
        console.log('Categories:', this.categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }


  /**
   * Filtrer les événements par catégorie
   * @param categoryId
   */

  filterEventsByCategory(categoryId: string | null): void {
    this.selectedCategory = categoryId;
    this.eventService.getEventsByCategory(this.selectedCategory).subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (error) => {
        console.error('Error fetching filtered events:', error);
      }
    });
  }


  /**
   * Filtrer les événements par date
   * @param startDate
   * @param endDate
   */

  filterEventsByDate(): void {
    if (this.startDate && this.endDate) {
      const startDateISO = new Date(this.startDate).toISOString();
      const endDateISO = new Date(this.endDate).toISOString();

      this.eventService.getEventsByDateRange(startDateISO, endDateISO).subscribe({
        next: (data) => {
          this.events = data;
        },
        error: (error) => {
          console.error('Error fetching events:', error);
        }
      });
    }
  }


  /*
  onSearchChange(): void {
    this.loadEvents(0, this.pageSize, this.searchTerm);
  }
   */


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

  openEventModal(event: any) {
    this.openModal();
    const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      modalElement.classList.remove('hidden');
    }
    this.selectedEvent = event;
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
