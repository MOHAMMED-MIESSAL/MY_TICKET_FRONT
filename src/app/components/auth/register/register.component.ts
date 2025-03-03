import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  imageUrl: string = 'assets/images/register.jpeg';

  user: User = {
    email: '',
    password: '',
    role: 'USER', // Default value, but can be changed by the user
    sex: 'MALE', // Default value, but can be changed by the user
    username: ''
  };

  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (!this.user.email || !this.user.password || !this.user.username) {
      this.errorMessage = 'All the fields are required.';
      return;
    }

    this.authService.register(this.user).subscribe(
      () => this.router.navigate(['/login']),
      error => {
        console.error('Registration error:', error);

        // Vérifier si le backend renvoie un message d'erreur
        if (error.error && typeof error.error === 'string') {
          this.errorMessage = error.error; // Utiliser le message renvoyé par le backend
        } else {
          this.errorMessage = "An error occurred while registering the user.";
        }
      }
    );

  }
}
