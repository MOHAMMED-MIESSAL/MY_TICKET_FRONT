import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})

export class AuthFormComponent {
  @Input() mode: 'login' | 'register' = 'login';
  @Input() user: any = {email: '', password: ''};
  @Input() errorMessage: string = '';
  @Output() submitAction = new EventEmitter<void>();

  get title(): string {
    return this.mode === 'login' ? 'Sign In' : 'Sign Up';
  }

  get buttonText(): string {
    return this.mode === 'login' ? 'Sign in' : 'Register';
  }

  get linkText(): string {
    return this.mode === 'login' ? "You don't have an account?" : "You already have an account?";
  }

  get linkRoute(): string {
    return this.mode === 'login' ? '/register' : '/login';
  }
}
