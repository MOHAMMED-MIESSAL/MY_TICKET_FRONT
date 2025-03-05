import { Component } from '@angular/core';
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {HeroComponent} from "../../partials/hero/hero.component";
import {FooterComponent} from "../../partials/footer/footer.component";
import {HomeCategoriesComponent} from "../../partials/home-categories/home-categories.component";
import {PopularEventsComponent} from "../../partials/popular-events/popular-events.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    HomeCategoriesComponent,
    PopularEventsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
