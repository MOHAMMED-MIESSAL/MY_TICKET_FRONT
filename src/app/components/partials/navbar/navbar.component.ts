import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {jwtDecode, JwtPayload} from "jwt-decode";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  isLoggedIn = false;
  isDropdownOpen = false;
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.checkLoginStatus();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: JwtPayload & { role?: string; userId?: string } = jwtDecode(token);
        this.userRole = decodedToken.role || null;
      }
      catch (e) {
        console.error('Error decoding token:', e);
      }
    }
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
