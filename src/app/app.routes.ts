import {Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {HomeComponent} from "./components/pages/home/home.component";
import {RegisterComponent} from "./components/auth/register/register.component";

export const routes: Routes = [

  {path:"" , component: HomeComponent , pathMatch : "full"},
  {path: "home" , component: HomeComponent },
  {path: "login" , component: LoginComponent},
  {path: "register" , component: RegisterComponent}

];
