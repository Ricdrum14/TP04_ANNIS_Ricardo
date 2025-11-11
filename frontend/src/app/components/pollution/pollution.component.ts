import { Component, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
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
    CommonModule,
    
  ],
  templateUrl: './pollution.component.html',
  styleUrls: ['./pollution.component.css']
})
export class PollutionComponent implements AfterViewChecked {
  showForm = false; // ✅ formulaire caché par défaut
  successMessage = ''; // ✅ message de succès
  refreshKey = 0; // ✅ pour rafraîchir la liste
  searchText = '';
  private pendingScroll = false;

   // ✅ référence pour scroller
  @ViewChild('declareFormSection') declareFormSection!: ElementRef<HTMLElement>;

  /** 🔁 Ouvre / ferme le formulaire */
   toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.pendingScroll = true; // 👈 indique qu'on doit scroller quand la vue est prête
    }
  }

   ngAfterViewChecked() {
    if (this.pendingScroll && this.declareFormSection) {
      this.declareFormSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      this.pendingScroll = false; // ✅ on a scrollé, on reset
    }
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  // 🔹 appelé par le HEADER quand on clique sur “Accueil”
  onGoHome() {
    this.showForm = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 🔹 appelé par le HEADER quand on clique sur “Déclarer”
  onOpenDeclareForm() {
    if (!this.showForm) this.showForm = true;
    // attendre que le DOM montre la section puis scroller
    setTimeout(() => {
      this.declareFormSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }


}
