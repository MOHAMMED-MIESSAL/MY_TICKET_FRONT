import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {HeaderComponent} from "../header/header.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
