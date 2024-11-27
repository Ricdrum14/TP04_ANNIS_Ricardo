// card.service.ts
import { Injectable, signal,WritableSignal } from '@angular/core';
import { Card } from './bank-card-management/models/card';


@Injectable({
  providedIn: 'root',
})
export class CardService {

   

  private listCards: WritableSignal<Card[]> = signal([]); // liste des cartes

  // Méthode publique pour ajouter une carte
  addCards(newCard: Card): void {
    this.listCards.update(cards => [...cards, newCard]); // Met à jour la liste des cartes
  }

  // Méthode pour supprimer une carte par PAN
  deleteCardByPan(pan: string): void {
    this.listCards.update(cards => cards.filter(card => card.pan !== pan));
  }

  // Méthode pour récupérer la liste des cartes
  getCards() {
    return this.listCards.asReadonly();
  }
}
