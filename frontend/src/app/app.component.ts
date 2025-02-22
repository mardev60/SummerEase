import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { FormStepperComponent } from "./components/form-stepper/form-stepper.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, FormStepperComponent, ConfirmationComponent],
    templateUrl: "./app.component.html",
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
