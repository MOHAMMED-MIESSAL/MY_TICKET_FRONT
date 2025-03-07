import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-reservations',
  standalone: true,
    imports: [
        HeaderComponent,
        SidebarComponent
    ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

}
