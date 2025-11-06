import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pollution } from '../../models/pollution';
import { PollutionService } from '../../services/pollution.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pollution-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pollutions-details.component.html',
  styleUrls: ['./pollutions-details.component.css']
})
export class PollutionsDetailsComponent implements OnInit, OnDestroy {
  private _pollution!: Pollution;
  
  @Input() set pollution(value: Pollution) {
    this._pollution = value;
    if (this.form && value) {
      this.updateForm(value);
    }
  }
  get pollution(): Pollution {
    return this._pollution;
  }
  editMode = false;
  form!: FormGroup;

  // ✅ Pour détruire les subscriptions
  private destroy$ = new Subject<void>();

  successMessage = ''; // pour afficher un feedback visuel à l’utilisateur

  constructor(
    private fb: FormBuilder,
    private pollutionService: PollutionService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      titre: [this.pollution.titre],
      type: [this.pollution.type],
      description: [this.pollution.description],
      date: [this.pollution.date],
      lieu: [this.pollution.lieu],
      latitude: [this.pollution.latitude],
      longitude: [this.pollution.longitude],
      photo: [this.pollution.photo]
    });
  }

  private updateForm(pollution: Pollution) {
    if (this.form) {
      this.form.patchValue({
        titre: pollution.titre,
        type: pollution.type,
        description: pollution.description,
        date: pollution.date,
        lieu: pollution.lieu,
        latitude: pollution.latitude,
        longitude: pollution.longitude,
        photo: pollution.photo
      });
    } else {
      this.initForm();
    }
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.successMessage = ''; // efface le message s’il y en avait un
  }

  saveChanges() {
    const updatedPollution: Pollution = {
      ...this.pollution,
      ...this.form.value
    };

    this.pollutionService
      .updatePollution(updatedPollution)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated) => {
          // ✅ Mise à jour locale
          this.pollution = updated;
          this.form.patchValue(updated);
          this.editMode = false;

          // ✅ Message temporaire de succès
          this.successMessage = '✅ Pollution mise à jour avec succès !';
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => console.error('Erreur lors de la mise à jour :', err)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
