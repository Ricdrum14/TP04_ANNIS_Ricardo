import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  prenom = '';
  nom = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  formSubmitted = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  /** Vérifie si les mots de passe correspondent */
  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  /** 🧾 Inscription de l’utilisateur */
  onSignup() {
  this.formSubmitted = true;

  if (!this.prenom || !this.nom || !this.email || !this.password || !this.passwordsMatch()) {
    alert("Merci de remplir correctement tous les champs.");
    return;
  }

  this.isLoading = true;

  this.utilisateurService
    .register({
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      mot_de_passe: this.password
    })
    .subscribe({
      next: async (user) => {
        console.log('✅ Utilisateur créé :', user);
        this.isLoading = false;
        alert('Compte créé avec succès 🎉 Vous pouvez maintenant vous connecter.');
        await this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de l’inscription :', err);
        this.isLoading = false;
        if (err.message.includes('déjà')) {
          alert('Un compte existe déjà avec cet email 📧');
        } else {
          alert('Erreur lors de la création du compte.');
        }
      }
    });
}

}
