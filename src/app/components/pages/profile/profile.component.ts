import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../partials/navbar/navbar.component";
import { UserService } from "../../../services/user.service";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, NgIf, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userId: string | null = null;
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: JwtPayload & { role?: string; userId?: string } = jwtDecode(token);

        // Prends l'ID de l'utilisateur depuis "userId" ou "sub"
        this.userId = decodedToken.userId ?? decodedToken.sub ?? null;

        if (this.userId) {
          this.loadUserInfos();
        } else {
          console.error("L'ID utilisateur est introuvable dans le token.");
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    }
  }

  loadUserInfos() {
    if (!this.userId) {
      console.error("Impossible de charger les infos de l'utilisateur : ID manquant.");
      return;
    }

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user; // Stocker les données utilisateur
        console.log('User data:', user);
      },
      error: () => {
        console.error('Impossible de charger les données utilisateur.');
      }
    });
  }
}
