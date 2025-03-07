import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../../../../services/category.service';
import {NgIf} from '@angular/common';
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";
import {HeaderComponent} from "../../../components/header/header.component";


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  standalone: true,
  imports: [NgIf, SidebarComponent, HeaderComponent, ReactiveFormsModule,]
})
export class CreateCategoryComponent {
  requestForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  createCategory() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.errorMessage = "Vous devez être connecté.";
      this.router.navigate(['/login']);
      return;
    }

    if (this.requestForm.invalid) {
      this.errorMessage = "Veuillez remplir correctement le formulaire.";
      return;
    }

    this.categoryService.createCategory(this.requestForm.value).subscribe({
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
