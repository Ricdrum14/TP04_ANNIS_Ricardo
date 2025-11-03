import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pollution } from '../models/pollution';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private apiUrl = environment.backendPollution;
  private isMock = !environment.production; // 👈 détermine si on est en local

  private localPollutions: Pollution[] = [];
  private pollutionsSubject = new BehaviorSubject<Pollution[]>([]);
  pollutions$ = this.pollutionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** 🔹 Récupère toutes les pollutions */
  getPollutions(): Observable<Pollution[]> {
    // 👇 Si c’est la première fois, on charge depuis la source
    if (this.localPollutions.length === 0) {
      return this.http.get<Pollution[]>(this.apiUrl).pipe(
        tap(data => {
          this.localPollutions = data;
          this.pollutionsSubject.next(data);
        })
      );
    }
    // 👇 Sinon, on renvoie le flux actuel
    return this.pollutions$;
  }

  /** ➕ Ajoute une pollution */
  addPollution(pollution: Pollution): Observable<Pollution> {
    if (this.isMock) {
      // ✅ mode local : on simule l’ajout
      this.localPollutions.push(pollution);
      this.pollutionsSubject.next([...this.localPollutions]);
      console.log('✅ Pollution ajoutée (mock) :', pollution);
      return of(pollution);
    } else {
      // ✅ mode production : appel API
      return this.http.post<Pollution>(this.apiUrl, pollution).pipe(
        tap((newPollution) => {
          this.localPollutions.push(newPollution);
          this.pollutionsSubject.next([...this.localPollutions]);
        })
      );
    }
  }

  /** ✏️ Met à jour une pollution */
  updatePollution(updated: Pollution): Observable<Pollution> {
    if (this.isMock) {
      const index = this.localPollutions.findIndex(p => p.id === updated.id);
      if (index !== -1) this.localPollutions[index] = updated;
      this.pollutionsSubject.next([...this.localPollutions]);
      return of(updated);
    } else {
      return this.http.put<Pollution>(`${this.apiUrl}/${updated.id}`, updated).pipe(
        tap(updatedPollution => {
          const index = this.localPollutions.findIndex(p => p.id === updatedPollution.id);
          if (index !== -1) this.localPollutions[index] = updatedPollution;
          this.pollutionsSubject.next([...this.localPollutions]);
        })
      );
    }
  }

  /** ❌ Supprime une pollution */
  deletePollution(id: string): Observable<void> {
    if (this.isMock) {
      this.localPollutions = this.localPollutions.filter(p => p.id !== id);
      this.pollutionsSubject.next([...this.localPollutions]);
      return of(void 0);
    } else {
      return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
        tap(() => {
          this.localPollutions = this.localPollutions.filter(p => p.id !== id);
          this.pollutionsSubject.next([...this.localPollutions]);
        })
      );
    }
  }
}
