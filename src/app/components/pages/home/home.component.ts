import { Component } from '@angular/core';
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {HeroComponent} from "../../partials/hero/hero.component";
import {FooterComponent} from "../../partials/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
