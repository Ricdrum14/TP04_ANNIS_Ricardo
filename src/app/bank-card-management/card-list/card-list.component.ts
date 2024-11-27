import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../models/card';
import { CaviarderPipe } from '../pipes/caviarder.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CaviarderPipe],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input() cards: Card[] = []; // Reçoit la liste des cartes à afficher en entrée

  // Ajoutez cet Output pour émettre un événement vers le parent lors de la suppression d'une carte
  @Output() onDeleteCard = new EventEmitter<string>(); // `string` ici représente le type du `pan`

  // Méthode pour émettre l'événement de suppression
  deleteCard(pan: string) {
    this.onDeleteCard.emit(pan);
  }
}
