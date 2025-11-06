import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionService } from '../../../services/pollution.service';
import { Pollution } from '../../../models/pollution';
import { Observable, map, Subject} from 'rxjs';
import { PollutionsDetailsComponent } from '../../pollutions-details/pollutions-details.component';

@Component({
  selector: 'app-pollutions-list',
  standalone: true,
  imports: [CommonModule, PollutionsDetailsComponent],
  templateUrl: './pollutions-list.component.html',
  styleUrls: ['./pollutions-list.component.css']
})
export class PollutionsListComponent implements OnInit, OnChanges, OnDestroy {
  /** 👇 Ajout essentiel pour la liaison parent → enfant */
  @Input() refreshTrigger = 0;
  @Input() filterText = '';

  pollutions$!: Observable<Pollution[]>;
  loading = true;
  selectedPollution?: Pollution;

  showAll = false; // contrôle du bouton voir plus / moins
  maxVisible = 4; // limite par défaut

  private destroy$ = new Subject<void>();

  constructor(private pollutionService: PollutionService) {}

  ngOnInit(): void {
    this.loadPollutions();
  }

  /** 🔁 Quand refreshTrigger change → recharge les pollutions */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshTrigger'] && !changes['refreshTrigger'].firstChange) {
      this.loadPollutions();
    }
  }

  /** 🧩 Fonction centralisée pour charger les pollutions */
  private loadPollutions(): void {
    this.pollutions$ = this.pollutionService.pollutions$;
    this.pollutionService.getPollutions().subscribe(() => {
      this.loading = false;
    });
  }

  viewDetails(pollution: Pollution) {
    console.log('ID de la pollution:', pollution.id); // Debug
    this.loading = true;
    this.pollutionService.getPollutionById(pollution.id).subscribe({
      next: (detailedPollution) => {
        console.log('Détails reçus:', detailedPollution); // Debug
        this.selectedPollution = detailedPollution;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails:', error);
        this.loading = false;
        // Afficher un message à l'utilisateur
        alert('Impossible de charger les détails de la pollution. ' + error.message);
      }
    });
  }

  closeDetails() {
    this.selectedPollution = undefined;
  }

  deletePollution(id: string) {
    if (confirm('❌ Voulez-vous vraiment supprimer cette pollution ?')) {
      this.pollutionService.deletePollution(id).subscribe(() => {
        this.loadPollutions(); // recharge après suppression
      });
    }
  }

  toggleView() {
    this.showAll = !this.showAll;
  }


get filteredPollutions$(): Observable<Pollution[]> {
  return this.pollutions$.pipe(
    map(pollutions =>
      pollutions.filter(p =>
        p.titre.toLowerCase().includes(this.filterText) ||
        p.lieu.toLowerCase().includes(this.filterText) ||
        p.description.toLowerCase().includes(this.filterText)
      )
    )
  );
}

/** 🧹 Nettoyage automatique quand le composant est détruit */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
