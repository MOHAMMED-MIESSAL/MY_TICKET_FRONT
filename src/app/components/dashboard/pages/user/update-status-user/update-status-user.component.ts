import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../../components/header/header.component";
import {NgIf} from "@angular/common";
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";
import {UserService} from "../../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-status-user',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    NgIf,
    ReactiveFormsModule,
    SidebarComponent
  ],
  templateUrl: './update-status-user.component.html',
  styleUrl: './update-status-user.component.css'
})
export class UpdateStatusUserComponent implements OnInit {

  requestForm!: FormGroup;
  errorMessage: string = '';
  userId!: string;
  userData: any = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    // Initialize the form with empty values
    this.requestForm = this.fb.group({
      role: ['', Validators.required]
    });

    // Load the existing user
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userData = user;
        this.requestForm.patchValue({
          role: user.role
        });
      },
      error: () => {
        this.errorMessage = "Impossible to load the user data.";
      }
    });
  }

  updateUserStatus() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.requestForm.invalid) {
      this.errorMessage = "Please fill in all the required fields.";
      return;
    }

    // Merge the existing user data with the new form data
    const updatedUserData = {...this.userData, ...this.requestForm.value};

    this.userService.updateUserStatus(this.userId, updatedUserData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/users']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || "An error occurred while updating the user status.";
      }
    });
  }
}
