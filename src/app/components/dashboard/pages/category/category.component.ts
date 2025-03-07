import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-category',
  standalone: true,
    imports: [
        HeaderComponent,
        SidebarComponent
    ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
