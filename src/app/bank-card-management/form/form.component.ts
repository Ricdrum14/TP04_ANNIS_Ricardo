// form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardService } from '../../card.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cardForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private cardService: CardService) {
    this.cardForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      pan: ['', [Validators.required, Validators.pattern('^(\\d{4} ?){4}$')]], // Accept 4 blocks of 4 digits
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]], // 3 digits for CVV
      expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/(\\d{2})$')]], // Format MM/YY
    });
  }

  ngOnInit(): void {
    this.cardForm.valueChanges.subscribe((val) => {
      console.log('Valeurs du formulaire en temps réel:', val);
    });
  }

  submit(): void {
    // Vérifie si le formulaire est valide avant de soumettre
    if (this.cardForm.valid) {
      const newCard: Card = {
        id: Date.now(), // Génère un identifiant unique basé sur le timestamp
        ...this.cardForm.value // Utilise les valeurs du formulaire pour créer un nouvel objet carte
      };
      
      // Ajoute la carte au service
      this.cardService.addCards(newCard);
      
      // Réinitialise le formulaire après soumission
      this.cardForm.reset(); 
      console.log('Carte ajoutée:', newCard);
    } else {
      console.log('Formulaire invalide');
    }
  }

}
