import {Routes} from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/auth/login/login.component";
import {TestAuthComponent} from "./components/auth/test-auth/test-auth.component";
import {AdminTestAuthComponent} from "./components/auth/admin-test-auth/admin-test-auth.component";

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", component: LoginComponent, pathMatch: 'full'},
  {path: 'test', component: TestAuthComponent, canActivate: [authGuard]},
  {path:'dashboard', component: AdminTestAuthComponent, canActivate: [authGuard]}
];
