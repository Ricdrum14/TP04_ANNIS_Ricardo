import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PollutionService } from '../../services/pollution.service';
import { Pollution } from '../../models/pollution';

@Component({
  selector: 'app-pollutions-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pollutions-form.component.html',
  styleUrls: ['./pollutions-form.component.css']
})
export class PollutionsFormComponent implements OnInit {

  /** ✅ Événement envoyé au parent avec le message de succès */
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
        [
          Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/),
          Validators.required,
          Validators.min(-90),
          Validators.max(90)
        ]
      ],
      longitude: [
        '',
        [
          Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/),
          Validators.required,
          Validators.min(-180),
          Validators.max(180)
        ]
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
    const newPollution: Pollution = {
      ...formData,
      id: crypto.randomUUID().substring(0, 8),
      date: new Date(formData.date),
      photo: this.photoPreview || formData.photo
    };

    this.pollutionService.addPollution(newPollution).subscribe({
      next: (pollution) => {
        console.log('✅ Pollution ajoutée :', pollution);

        // ✅ On émet le message de succès vers le parent
        this.pollutionAdded.emit(`✅ Pollution "${pollution.titre}" déclarée avec succès !`);

        // Réinitialisation
        this.pollutionForm.reset();
        this.photoPreview = null;
      },
      error: (err) => console.error('Erreur ajout pollution', err)
    });
  }

  /** 📁 Quand une photo locale est sélectionnée */
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
