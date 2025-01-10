import {Component,inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../../auth.service';
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;
  router = inject(Router);


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const {email, password} = this.form.value;

      this.authService.login(email, password).subscribe({
        next: (response: { token: string }) => {
          localStorage.setItem('token', response.token);

          // Récupérer le rôle et rediriger
          this.authService.getUserRole().subscribe({
            next: (role) => {
              if (role === 'ADMIN') {
                this.router.navigate(['/dashboard']);
              } else if (role === 'MEMBER') {
                this.router.navigate(['/test']);
              } else {
                this.router.navigate(['/unauthorized']);
              }
            },
            error: () => this.router.navigate(['/login']),
          });
        },
        error: (error: any) => {
          console.error('Login failed:', error);
        },
      });
    }
  }


  logout() {
    this.authService.logout();
  }
}
