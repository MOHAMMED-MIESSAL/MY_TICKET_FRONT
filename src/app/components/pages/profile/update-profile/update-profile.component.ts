import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../partials/navbar/navbar.component";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {

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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      sex: ['', Validators.required]
    });

    // Load the existing user
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userData = user;
        this.requestForm.patchValue({
          username: user.username,
          email: user.email,
          sex: user.sex
        });
      },
      error: () => {
        this.errorMessage = "Impossible to load the user data.";
      }
    });
  }

  updateUser() {
    if (this.requestForm.invalid) return;

    let updateData = this.requestForm.value;


    // Ne pas envoyer le rôle si l'utilisateur n'a pas changé
    updateData.role = this.userData.role;

    // Effectuer la mise à jour de l'utilisateur
    this.userService.updateUser(this.userId, updateData).subscribe({
      next: () => {
        console.log('Profil mis à jour avec succès.');
        // Rediriger ou afficher un message de succès
      },
      error: (error) => {
        this.errorMessage = "Erreur lors de la mise à jour du profil.";
        console.error(error);
      }
    });

    this.router.navigate(['/profile']);
  }


}
