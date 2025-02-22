import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries, Country } from './country-data';

interface TimeOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-form-stepper',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-stepper.component.html'
})
export class FormStepperComponent {
  @Output() subscriptionComplete = new EventEmitter<void>();
  
  currentStep = 1;
  isSubmitting = false;
  subscriptionForm: FormGroup;
  countries = countries;

  availableTimes: TimeOption[] = [
    { value: '7', label: '7h - Pour bien démarrer la journée 🌅' },
    { value: '8', label: '8h - Pendant le petit déjeuner ☕' },
    { value: '9', label: '9h - En arrivant au bureau 💼' },
    { value: '10', label: '10h - Après la réunion du matin 📊' },
    { value: '12', label: '12h - Pendant la pause déjeuner 🍽️' }
  ];

  constructor(private fb: FormBuilder) {
    this.subscriptionForm = this.fb.group({
      topic: ['', Validators.required],
      alertTime: ['', Validators.required],
      countryCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }

  getPlaceholder(): string {
    const countryCode = this.subscriptionForm.get('countryCode')?.value;
    return countryCode === 'FR' ? '6 12 34 56 78' : 'Numéro sans préfixe';
  }

  onCountryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const countryCode = select.value;
    this.subscriptionForm.get('phoneNumber')?.setValue('');
  }

  isPhoneInvalid(): boolean {
    const phoneControl = this.subscriptionForm.get('phoneNumber');
    return phoneControl?.invalid && phoneControl?.touched || false;
  }

  isFormValid(): boolean {
    return this.subscriptionForm.valid;
  }

  getFullPhoneNumber(): string {
    const countryCode = this.subscriptionForm.get('countryCode')?.value;
    const phoneNumber = this.subscriptionForm.get('phoneNumber')?.value;
    const country = countries.find(c => c.code === countryCode);
    return country ? `${country.prefix}${phoneNumber}` : '';
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.subscriptionForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.isSubmitting = false;
      this.subscriptionComplete.emit();
    } else {
      // Trigger form validation
      Object.keys(this.subscriptionForm.controls).forEach(key => {
        const control = this.subscriptionForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });

      // Vibrate if available
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  }
}