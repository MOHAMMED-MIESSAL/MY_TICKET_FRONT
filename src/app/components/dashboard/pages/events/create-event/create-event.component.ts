import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../components/header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";
import {Router} from "@angular/router";
import {EventService} from "../../../../../services/event.service";
import {CategoryService} from "../../../../../services/category.service";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {Validators} from "@angular/forms";


@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    ReactiveFormsModule,
    SidebarComponent,
    NgForOf
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {

  requestForm: FormGroup;
  errorMessage: string = '';
  categories: any[] = [];
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', Validators.required],
      available_seats: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required],

    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: JwtPayload & { role?: string; userId?: string } = jwtDecode(token);
        this.userId = decodedToken.sub || null; // Get the user id from the token
        this.loadCategories();
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => this.categories = response.content, // Extraire `content`
      error: (err) => console.error('Erreur lors de la récupération des catégories', err)
    });
  }


  createEvent() {

    // Get the user id from the token
    const eventData = {
      ...this.requestForm.value,
      userId: this.userId
    };

    this.eventService.createEvent(eventData).subscribe({
      next: () => this.router.navigate(['/dashboard/events']),
      error: (err) => {
        console.error('Erreur lors de la création de l\'événement', err);
        this.errorMessage = 'Une erreur s\'est produite lors de la création de l\'événement.';
      }
    });
  }


}
