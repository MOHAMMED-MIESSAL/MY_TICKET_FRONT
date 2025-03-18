import {Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {HomeComponent} from "./components/pages/home/home.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {EventListComponent} from "./components/pages/event-list/event-list.component";
import {MainComponent} from "./components/dashboard/components/main/main.component";
import {UserComponent} from "./components/dashboard/pages/user/user.component";
import {CategoryComponent} from "./components/dashboard/pages/category/category.component";
import {EventsComponent} from "./components/dashboard/pages/events/events.component";
import {ReservationsComponent} from "./components/dashboard/pages/reservations/reservations.component";
import {CreateCategoryComponent} from "./components/dashboard/pages/category/create-category/create-category.component";
import {UpdateCategoryComponent} from "./components/dashboard/pages/category/update-category/update-category.component";
import {CreateUserComponent} from "./components/dashboard/pages/user/create-user/create-user.component";
import {CreateEventComponent} from "./components/dashboard/pages/events/create-event/create-event.component";
import {UpdateEventComponent} from "./components/dashboard/pages/events/update-event/update-event.component";
import {UpdateStatusUserComponent} from "./components/dashboard/pages/user/update-status-user/update-status-user.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {UpdateProfileComponent} from "./components/pages/profile/update-profile/update-profile.component";
import {ContactComponent} from "./components/partials/contact/contact.component";
import {ReservationComponent} from "./components/pages/reservations/reservation.component";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  // Public routes
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "contact", component: ContactComponent},
  {path: "register", component: RegisterComponent},
  {path: "events", component: EventListComponent},
  // Admin & SUPER Admin and ORGANIZER  routes
  {path: "dashboard", component: MainComponent, canActivate: [authGuard]},
  {path: "dashboard/users", component: UserComponent, canActivate: [authGuard]},
  {path: "dashboard/users/create", component: CreateUserComponent, canActivate: [authGuard]},
  {path: "dashboard/users/update-status-user/:id", component: UpdateStatusUserComponent, canActivate: [authGuard]},
  {path: "dashboard/categories", component: CategoryComponent, canActivate: [authGuard]},
  {path: "dashboard/categories/create", component: CreateCategoryComponent, canActivate: [authGuard]},
  {path: 'dashboard/categories/update-category/:id', component: UpdateCategoryComponent, canActivate: [authGuard]},
  {path: "dashboard/events", component: EventsComponent, canActivate: [authGuard]},
  {path: "dashboard/events/create", component: CreateEventComponent, canActivate: [authGuard]},
  {path: "dashboard/events/update-event/:id", component: UpdateEventComponent, canActivate: [authGuard]},
  {path: "dashboard/reservations", component: ReservationsComponent, canActivate: [authGuard]},
  // User routes
  {path: "profile", component: ProfileComponent, canActivate: [authGuard]},
  {path: "profile/:id", component: UpdateProfileComponent, canActivate: [authGuard]},
  {path: "reservation", component: ReservationComponent, canActivate: [authGuard]}
];
