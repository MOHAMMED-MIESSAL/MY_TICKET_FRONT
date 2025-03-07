import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
        HeaderComponent,
        SidebarComponent
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
