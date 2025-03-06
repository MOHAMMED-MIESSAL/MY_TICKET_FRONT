import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    NgIf,
    RouterLink
  ]
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  isDropdownOpen = false;

  constructor() {
  }

  ngOnInit(): void {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      this.isDarkMode = storedDarkMode === 'true';
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


}
