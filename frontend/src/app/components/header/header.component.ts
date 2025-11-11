import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  searchQuery = '';
  user: Utilisateur | null = null;

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
}
