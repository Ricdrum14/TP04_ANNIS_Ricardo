import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PollutionService } from '../../services/pollution.service';
import { Pollution } from '../../models/pollution';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pollutions-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pollutions-form.component.html',
  styleUrls: ['./pollutions-form.component.css']
})
export class PollutionsFormComponent implements OnInit {

  @Output() pollutionAdded = new EventEmitter<string>();

  pollutionForm!: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;
  successMessage = '';
  formSubmitted = false;

  constructor(private fb: FormBuilder, private pollutionService: PollutionService) {}

  ngOnInit(): void {
    this.pollutionForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      date: ['', [Validators.required]],
      lieu: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      latitude: [
        '',
        [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/), Validators.required, Validators.min(-90), Validators.max(90)]
      ],
      longitude: [
        '',
        [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/), Validators.required, Validators.min(-180), Validators.max(180)]
      ],
      photo: ['']
    });
  }

  get f() {
    return this.pollutionForm.controls;
  }

  /** ✅ Soumission du formulaire */
  sendForm() {
    if (this.pollutionForm.invalid) return;

    const formData = this.pollutionForm.value;

    // ⚠️ Si on est en prod et que la photo est base64, on ne l’envoie pas
    const isBase64 = typeof this.photoPreview === 'string' && this.photoPreview.startsWith('data:');
    const safePhoto =
      environment.production && isBase64 ? null : this.photoPreview || formData.photo;

    const newPollution: Pollution = {
      ...formData,
      id: crypto.randomUUID().substring(0, 8),
      date: new Date(formData.date),
      photo: safePhoto
    };

    this.pollutionService.addPollution(newPollution).subscribe({
      next: (pollution) => {
        console.log('✅ Pollution ajoutée :', pollution);
        this.pollutionAdded.emit(`✅ Pollution "${pollution.titre}" déclarée avec succès !`);
        this.pollutionForm.reset();
        this.photoPreview = null;
      },
      error: (err) => console.error('Erreur ajout pollution', err)
    });
  }

  /** 📁 Sélection d’une photo locale */
  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result;
      this.pollutionForm.patchValue({ photo: this.photoPreview });
    };
    reader.readAsDataURL(file);
  }
}
