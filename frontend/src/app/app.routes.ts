import { Routes } from '@angular/router';
import { PollutionComponent } from './components/pollution/pollution.component';
import { ProfilComponent } from './components/profil/profil.component';

export const routes: Routes = [
  { path: '', component: PollutionComponent},
  {
    path: 'profil',
    component: ProfilComponent,
  },
  { 
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(m => m.SignupComponent),
  },
   { path: '**', redirectTo: '' },
];
