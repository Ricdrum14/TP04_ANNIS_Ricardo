import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pollution } from '../models/pollution';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private apiUrl = environment.backendPollution;

  private localPollutions: Pollution[] = [];

  // ✅ Stream réactif partagé entre les composants
  private pollutionsSubject = new BehaviorSubject<Pollution[]>([]);
  pollutions$ = this.pollutionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** 🔹 Récupère toutes les pollutions */
  getPollutions(): Observable<Pollution[]> {
    if (this.localPollutions.length === 0) {
      return this.http.get<Pollution[]>(this.apiUrl).pipe(
        map((data) => {
          this.localPollutions = data;
          this.pollutionsSubject.next(data); // 🔄 push dans le flux
          return data;
        })
      );
    } else {
      return this.pollutions$; // 🔄 on renvoie le flux directement
    }
  }

  /** ➕ Ajoute une pollution */
  addPollution(pollution: Pollution): Observable<Pollution> {
    this.localPollutions.push(pollution);
    this.pollutionsSubject.next([...this.localPollutions]); // 🔄 notify tous les composants
    console.log('✅ Pollution ajoutée (mock) :', pollution);
    return of(pollution);
  }

  /** ✏️ Met à jour une pollution */
  updatePollution(updated: Pollution): Observable<Pollution> {
    const index = this.localPollutions.findIndex((p) => p.id === updated.id);
    if (index !== -1) {
      this.localPollutions[index] = updated;
      this.pollutionsSubject.next([...this.localPollutions]); // ✅ mise à jour temps réel
    }
    console.log('📝 Pollution mise à jour :', updated);
    return of(updated);
  }

  /** ❌ Supprime une pollution */
  deletePollution(id: string): Observable<void> {
    this.localPollutions = this.localPollutions.filter((p) => p.id !== id);
    this.pollutionsSubject.next([...this.localPollutions]);
    console.log('🗑️ Pollution supprimée :', id);
    return of(void 0);
  }
}
