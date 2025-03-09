import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {EventService} from "../../../../services/event.service";
import {Event} from "../../../../models/event.model";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {JwtPayload, jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    NgForOf,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  userRole: string | null = null;
  userId: string | null = null;

  protected readonly Math = Math;

  totalElements = 0;
  events: Event[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20];


  constructor(private eventService: EventService) {
  }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: JwtPayload & { role?: string; userId?: string } = jwtDecode(token);
        this.userRole = decodedToken.role || null;
        this.userId = decodedToken.sub || null; // Get the user id from the token

        if (this.userRole === 'ORGANIZER' && this.userId) {
          console.log('User id:', this.userId);
          console.log('User role:', this.userRole);
          this.loadEventsByUser(this.userId, this.currentPage, this.pageSize);
        } else {
          this.loadEvents(this.currentPage, this.pageSize);
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    } else {
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }

  /*
    Methods to fetch events
    */
  loadEvents(page: number, size: number): void {
    this.eventService.getAllEvents(page, size).subscribe({
      next: (data) => {
        this.events = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  /*
  Methods to fetch events by user id
   */
  loadEventsByUser(userId: string, page: number, size: number): void {
    this.eventService.getEventsByUser(userId, page, size).subscribe({
      next: (data) => {
        this.events = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }


  /*
  Methods to delete events
   */

  deleteEvent(eventId: string): void {
    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        this.loadEvents(this.currentPage, this.pageSize);
      },
      error: (error) => {
        console.error('Error deleting event:', error);
      }
    });

  }


    /*
   Methods to navigate through pages of categories
   */

    goToPreviousPage()
  :
    void {
      if(this.currentPage > 0
  )
    {
      this.currentPage--;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }

    goToNextPage()
  :
    void {
      if(this.currentPage < this.totalPages - 1
  )
    {
      this.currentPage++;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }

    changePage(page
  :
    number
  ):
    void {
      if(page !== this.currentPage
  )
    {
      this.currentPage = page;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }

    onPageSizeChange(size
  :
    number
  )
    {
      this.pageSize = size;
      this.currentPage = 0;
      this.loadEvents(this.currentPage, this.pageSize);
    }

    get
    pages()
  :
    number[]
    {
      return Array.from({length: this.totalPages}, (_, i) => i);
    }

  }
