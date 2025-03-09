import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  protected readonly Math = Math;

  totalElements = 0;
  users: User[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20];


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers(this.currentPage, this.pageSize);
  }


  loadUsers(page: number, size: number): void {
    this.userService.getAllUsers(page, size).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }


  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: (data) => {
        console.log('User deleted:', data);
        this.loadUsers(this.currentPage, this.pageSize);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }


  /*
 Methods to navigate through pages of categories
 */

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUsers(this.currentPage, this.pageSize);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadUsers(this.currentPage, this.pageSize);
    }
  }

  changePage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.loadUsers(this.currentPage, this.pageSize);
    }
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadUsers(this.currentPage, this.pageSize);
  }

  get pages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i);
  }

}
