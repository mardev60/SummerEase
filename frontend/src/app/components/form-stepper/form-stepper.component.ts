import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http"; // ✅ Import de HttpClient
import { Component, EventEmitter, Output } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";

interface TimeOption {
    value: string;
    label: string;
}

@Component({
    selector: "app-form-stepper",
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    templateUrl: "./form-stepper.component.html",
})
export class FormStepperComponent {
    @Output() subscriptionComplete = new EventEmitter<void>();

    currentStep = 1;
    isSubmitting = false;
    subscriptionForm: FormGroup;
    telegramLink = "";

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.subscriptionForm = this.fb.group({
            topic: [null, Validators.required],
            username: ["", Validators.required],
        });
    }

    isFormValid(): boolean {
        return this.subscriptionForm.valid;
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

    onSubmit(): void {
        if (this.isFormValid()) {
            this.isSubmitting = true;

            const username = this.subscriptionForm.get("username")?.value;
            const subject = this.subscriptionForm.get("topic")?.value;

            this.http
                .post("https://summerease-server-latest.onrender.com", { username, subject })
                .subscribe({
                    next: (data: any) => {
                        localStorage.setItem("tg_link", data.telegram_link);
                        this.subscriptionComplete.emit();
                    },
                    error: (error) => {
                        console.error("Erreur lors de la requête :", error);
                    },
                    complete: () => {
                        this.isSubmitting = false;
                    },
                });
        } else {
            Object.keys(this.subscriptionForm.controls).forEach((key) => {
                const control = this.subscriptionForm.get(key);
                if (control) {
                    control.markAsTouched();
                }
            });

            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
        }
    }
}
