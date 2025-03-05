import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-popular-events',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './popular-events.component.html',
  styleUrl: './popular-events.component.css'
})
export class PopularEventsComponent {

}
