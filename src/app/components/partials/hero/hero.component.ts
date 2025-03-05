import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {HomeCategoriesComponent} from "../home-categories/home-categories.component";
import {PopularEventsComponent} from "../popular-events/popular-events.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavbarComponent,
    HomeCategoriesComponent,
    PopularEventsComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
