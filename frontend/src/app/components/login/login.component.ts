import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  formSubmitted = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  /** 🔑 Connexion de l’utilisateur */
  onLogin() {
    this.formSubmitted = true;

    // Validation manuelle
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    if (this.password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    this.isLoading = true;

    this.utilisateurService.login(this.email, this.password).subscribe({
      next: async (user) => {
        console.log('✅ Utilisateur connecté :', user);
        this.isLoading = false;
        await this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Erreur de connexion :', err);
        this.isLoading = false;
        alert('Email ou mot de passe incorrect.');
      }
    });
  }
}
