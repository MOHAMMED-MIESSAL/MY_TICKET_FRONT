import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    NgIf
  ]
})
export class SidebarComponent {
  isPagesMenuOpen = false;
  isSideMenuOpen = false;

  togglePagesMenu(): void {
    this.isPagesMenuOpen = !this.isPagesMenuOpen;
  }

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  closeSideMenu(): void {
    this.isSideMenuOpen = false;
  }
}
