import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    NgIf,
    RouterLink
  ]
})
export class SidebarComponent implements OnInit {
  isPagesMenuOpen = false;
  isSideMenuOpen = false;
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) {

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

  togglePagesMenu(): void {
    this.isPagesMenuOpen = !this.isPagesMenuOpen;
  }

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  closeSideMenu(): void {
    this.isSideMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
