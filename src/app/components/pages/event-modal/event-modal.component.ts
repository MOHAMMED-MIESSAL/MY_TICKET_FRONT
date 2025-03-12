import {Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent {


  @Input() showModal: boolean = false;  // Contrôle l'affichage du modal
  @Output() closeModalEvent = new EventEmitter<void>();  // Événement de fermeture

  closeEventModal() {
    this.closeModalEvent.emit();  // Notifie le parent de fermer le modal
  }


}
