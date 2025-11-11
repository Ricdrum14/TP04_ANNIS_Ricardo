import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Router, RouterLink } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  @Input() user?: Utilisateur | null;
  email = '';
  mot_de_passe = '';
  message = '';
  showPassword = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit() {
    // ✅ Si pas d’@Input, on va chercher le user courant depuis le service
    if (!this.user) {
      this.user = this.utilisateurService.getCurrentUser();
    }

    // ✅ On initialise le champ email
    if (this.user) {
      this.email = this.user.email;
    } else {
      this.message = '⚠️ Aucun utilisateur connecté.';
    }
  }

  /** 🧾 Met à jour le profil */
  onUpdate() {
    if (!this.user) {
      this.message = 'Utilisateur introuvable.';
      return;
    }

    this.utilisateurService
      .updateUtilisateur(this.user.id, {
        email: this.email,
        mot_de_passe: this.mot_de_passe.trim() || undefined
      })
      .subscribe({
        next: () => {
          this.message = '✅ Profil mis à jour avec succès.';
          this.mot_de_passe = '';
        },
        error: (err) => {
          this.message = '❌ Erreur lors de la mise à jour.';
          console.error(err);
        }
      });
  }

  /** ❌ Supprimer le compte */
  onDelete() {
    if (!this.user) {
      this.message = 'Utilisateur introuvable.';
      return;
    }

    if (confirm('Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.')) {
      this.utilisateurService.deleteUtilisateur(this.user.id).subscribe({
        next: async () => {
          alert('Compte supprimé avec succès.');
          this.utilisateurService.logout();
          await this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Erreur lors de la suppression du compte.');
          console.error(err);
        }
      });
    }
  }
}
