import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {CategoryService} from "../../../../services/category.service";
import {NgForOf, NgIf} from "@angular/common";
import {Category} from "../../../../models/category.model";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    NgForOf,
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  protected readonly Math = Math;

  totalElements = 0;
  categories: Category[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.loadCategories(this.currentPage, this.pageSize);
  }


  /*
   Methods to fetch categories
   */
  loadCategories(page: number, size: number): void {
    this.categoryService.getAllCategories(page, size).subscribe({
      next: (data) => {
        this.categories = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  /*
    Methods to delete categories
   */
  deleteCategory(categoryId: string): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.loadCategories(this.currentPage, this.pageSize);
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      }
    });

  }


  /*
   Methods to navigate through pages of categories
   */

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCategories(this.currentPage, this.pageSize);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadCategories(this.currentPage, this.pageSize);
    }
  }

  changePage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.loadCategories(this.currentPage, this.pageSize);
    }
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadCategories(this.currentPage, this.pageSize);
  }

  get pages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i);
  }


}
