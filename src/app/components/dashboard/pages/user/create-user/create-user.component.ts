import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "../../../components/header/header.component";
import {NgIf} from "@angular/common";
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";
import {UserService} from '../../../../../services/user.service';
import {Router} from "@angular/router";
import {Validators} from "@angular/forms";


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    NgIf,
    ReactiveFormsModule,
    SidebarComponent
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  requestForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      sex: ['', Validators.required],
      role: ['', Validators.required]
    });
  }


  createUser() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.requestForm.invalid) {
      this.errorMessage = "Veuillez remplir correctement le formulaire.";
      return;
    }

    this.userService.createUser(this.requestForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/users']);
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
