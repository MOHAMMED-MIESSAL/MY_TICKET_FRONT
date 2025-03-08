import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../../services/category.service';
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";
import {HeaderComponent} from "../../../components/header/header.component";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-update-category',
  standalone: true,
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
  imports: [
    ReactiveFormsModule,
    SidebarComponent,
    HeaderComponent,
    NgIf
  ],
})
export class UpdateCategoryComponent implements OnInit {
  requestForm!: FormGroup;
  errorMessage: string = '';
  categoryId!: string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!; // Garder l'id en string

    this.requestForm = this.fb.group({
      name: ['', Validators.required]
    });

    // Charger la catégorie existante
    this.categoryService.getCategoryById(this.categoryId).subscribe(
      (category) => {
        this.requestForm.patchValue({name: category.name});
      },
      () => {
        this.errorMessage = 'Erreur lors du chargement de la catégorie';
      }
    );
  }


  updateCategory(): void {

    if (this.requestForm.invalid) {
      this.errorMessage = "Make sure to fill the form correctly.";
      return;
    }

    this.categoryService.updateCategory(this.categoryId, this.requestForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/categories']);
      },
      error: (error) => {
        if (error.error) {
          if (typeof error.error === 'string') {
            this.errorMessage = error.error;
          }
        } else {
          this.errorMessage = "Une erreur inconnue est survenue.";
        }
      }
    });
  }

}
