import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStepperComponent } from './components/form-stepper/form-stepper.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormStepperComponent, ConfirmationComponent],
  template: `
    <div class="min-h-screen bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] py-12 px-4">
      <div class="form-card">
        <div class="text-center mb-12">
          <div class="inline-flex items-center justify-center p-2 mb-4 rounded-2xl glass-effect">
            <svg
              class="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>
          <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            NewsVoice Daily
          </h1>
          <p class="text-lg text-gray-400">
            Recevez chaque matin vos actualités en audio, directement sur WhatsApp
          </p>
        </div>

        <app-form-stepper
          *ngIf="!showConfirmation"
          (subscriptionComplete)="onSubscriptionComplete()"
        />
        <app-confirmation
          *ngIf="showConfirmation"
          (reset)="resetForm()"
        />
      </div>
    </div>
  `,
})
export class App {
  showConfirmation = false;

  onSubscriptionComplete() {
    this.showConfirmation = true;
  }

  resetForm() {
    this.showConfirmation = false;
  }
}