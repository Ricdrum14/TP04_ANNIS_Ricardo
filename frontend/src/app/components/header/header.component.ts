import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  searchQuery = '';
  user: Utilisateur | null = null;

  @Input() declareActive = false; 
  @Output() goHome = new EventEmitter<void>();
  @Output() openDeclareForm = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter<string>();

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit() {
    // 👤 S’abonne à l’utilisateur connecté
    this.utilisateurService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearchChange() {
    this.searchChanged.emit(this.searchQuery.trim().toLowerCase());
  }

  async goLogin() {
    this.isMenuOpen = false;
    await this.router.navigate(['/login']);
  }

  async goSignup() {
    this.isMenuOpen = false;
    await this.router.navigate(['/signup']);
  }

  logout() {
    this.utilisateurService.logout();
  }

  // 🔹 Appelé quand on clique sur "Accueil"
  navigateHome() {
    this.isMenuOpen = false;
    this.goHome.emit();
  }

  // 🔹 Appelé quand on clique sur "Déclarer"
  declarePollution() {
    this.isMenuOpen = false;
    this.openDeclareForm.emit();
  }
}
