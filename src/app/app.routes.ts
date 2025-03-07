import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from "./components/pages/home/home.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { EventListComponent } from "./components/pages/event-list/event-list.component";
import {MainComponent} from "./components/dashboard/components/main/main.component";
import {UserComponent} from "./components/dashboard/pages/user/user.component";
import {CategoryComponent} from "./components/dashboard/pages/category/category.component";
import {EventsComponent} from "./components/dashboard/pages/events/events.component";
import {ReservationsComponent} from "./components/dashboard/pages/reservations/reservations.component";

export const routes: Routes = [
  {path:"" , component: HomeComponent , pathMatch : "full"},
  {path: "home" , component: HomeComponent },
  {path: "login" , component: LoginComponent},
  {path: "register" , component: RegisterComponent},
  {path: "events" , component: EventListComponent},
  {path: "dashboard" , component: MainComponent},
  {path: "dashboard/users" , component: UserComponent},
  {path: "dashboard/categories" , component: CategoryComponent},
  {path: "dashboard/events" , component: EventsComponent},
  {path: "dashboard/reservations" , component: ReservationsComponent}
];
