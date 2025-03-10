import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../../components/header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {EventService} from "../../../../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";
import {CategoryService} from "../../../../../services/category.service";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    SidebarComponent
  ],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent implements OnInit {

  requestForm!: FormGroup;
  errorMessage: string = '';
  eventId!: string;
  categories: any[] = [];
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: JwtPayload & { role?: string; userId?: string } = jwtDecode(token);
        this.userId = decodedToken.sub || null;
        this.loadCategories();
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'id utilisateur', error);
      }
    }

    this.eventId = this.route.snapshot.paramMap.get('id')!;

    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      available_seats: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
    });

    this.loadEvent();
  }

  loadEvent() {
    this.eventService.getEventById(this.eventId).subscribe(
      (event) => {
        this.requestForm.patchValue({
          title: event.title,
          description: event.description,
          city: event.city,
          date: event.date,
          location: event.location,
          capacity: event.capacity,
          available_seats: event.available_seats,
          price: event.price,
          categoryId: event.category?.id
        });
      },
      () => {
        this.errorMessage = 'Erreur lors du chargement de l\'événement';
      }
    );
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => this.categories = response.content,
      error: (err) => console.error('Erreur lors de la récupération des catégories', err)
    });
  }

  updateEvent(): void {
    if (this.requestForm.invalid) {
      this.errorMessage = "Make sure to fill the form correctly.";
      return;
    }

    if (!this.userId) {
      this.errorMessage = "User ID is missing.";
      return;
    }

    const eventData = {
      ...this.requestForm.value,
      userId: this.userId
    };


    this.eventService.updateEvent(this.eventId, eventData).subscribe(
      () => {
        this.router.navigate(['/dashboard/events']);
      },
      (error) => {
        console.error('Error updating event:', error); // Debugging
        this.errorMessage = 'Erreur lors de la mise à jour de l\'événement';
      }
    );
  }
}
