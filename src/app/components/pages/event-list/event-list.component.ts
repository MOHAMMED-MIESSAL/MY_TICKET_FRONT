import { Component } from '@angular/core';
import {NavbarComponent} from "../../partials/navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {

}
