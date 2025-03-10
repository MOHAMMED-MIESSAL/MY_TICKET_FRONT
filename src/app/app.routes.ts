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

export const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "events", component: EventListComponent},
  {path: "dashboard", component: MainComponent},
  {path: "dashboard/users", component: UserComponent},
  {path: "dashboard/users/create", component: CreateUserComponent},
  {path: "dashboard/users/update-status-user/:id", component: UpdateStatusUserComponent},
  {path: "dashboard/categories", component: CategoryComponent},
  {path: "dashboard/categories/create", component: CreateCategoryComponent},
  {path: 'dashboard/categories/update-category/:id', component: UpdateCategoryComponent},
  {path: "dashboard/events", component: EventsComponent},
  {path: "dashboard/events/create", component: CreateEventComponent},
  {path: "dashboard/events/update-event/:id", component: UpdateEventComponent},
  {path: "dashboard/reservations", component: ReservationsComponent}
];
