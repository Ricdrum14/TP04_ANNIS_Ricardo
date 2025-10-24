import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { PollutionsListComponent } from './pollutions-list/pollutions-list.component';
import { PollutionsFormComponent } from '../pollutions-form/pollutions-form.component';
import { Pollution } from '../../models/pollution';

@Component({
  selector: 'app-pollution',
  standalone: true,
  imports: [
    HeaderComponent,
    PollutionsListComponent,
    PollutionsFormComponent,
    CommonModule
  ],
  templateUrl: './pollution.component.html',
  styleUrls: ['./pollution.component.css']
})
export class PollutionComponent {
  showForm = false; // ✅ formulaire caché par défaut
  successMessage = ''; // ✅ message de succès
  refreshKey = 0; // ✅ pour rafraîchir la liste
  searchText = '';

  /** 🔁 Ouvre / ferme le formulaire */
  toggleForm() {
    this.showForm = !this.showForm;
  }

  /** ✅ Reçoit le message du composant enfant */
  onPollutionAdded(message: string) {
    this.successMessage = message;

    // 🔄 rafraîchit la liste
    this.refreshKey++;

    // ⏳ efface le message et cache le formulaire après 3 sec
    setTimeout(() => {
      this.successMessage = '';
      this.showForm = false;
    }, 3000);
  }

 

onSearchChanged(query: string) {
  this.searchText = query;
}

}
