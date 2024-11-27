import { Component, Signal } from '@angular/core';
import { CardService } from '../../card.service';
import { Card } from '../models/card';
import { CardListComponent } from '../card-list/card-list.component';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-card-signal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardListComponent], // Ajouter CommonModule et ReactiveFormsModule
  templateUrl: './card-signal.component.html',
})
export class CardSignalComponent {
  savedCards!: Signal<Card[]>; // Signal pour la liste des cartes
  showForm = false; // État pour afficher/masquer le formulaire dynamique

  cardForm!: FormGroup; // Formulaire dynamique

  constructor(private cardService: CardService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.savedCards = this.cardService.getCards();

    // Initialisation du formulaire
    this.cardForm = this.fb.group({
      pan: ['', [Validators.required, Validators.pattern('^(\\d{4} ?){4}$')]], // 16 chiffres
      expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/(\\d{2})$')]], // MM/AA
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]], // 3 chiffres
    });
  }

  // Bascule entre afficher/masquer le formulaire
  addCard() {
    this.showForm = true; // Affiche le formulaire
  }

  // Soumission du formulaire pour ajouter une carte
  submitCard() {
    if (this.cardForm.valid) {
      const newCard: Card = {
        id: Date.now(), // Génère un identifiant unique
        name: 'Carte Ajoutée', // Nom par défaut
        ...this.cardForm.value, // Utilise les valeurs du formulaire
      };

      this.cardService.addCards(newCard); // Ajoute la carte au service
      this.cardForm.reset(); // Réinitialise le formulaire
      this.showForm = false; // Masque le formulaire après soumission
    } else {
      console.log('Formulaire invalide');
    }
  }

  deleteCard(pan: string): void {
    this.cardService.deleteCardByPan(pan); // Supprime une carte par PAN
  }
}
