import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-confirmation",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./confirmation.component.html",
})
export class ConfirmationComponent implements OnInit {
    telegramLink: string | null = null;

    @Output() reset = new EventEmitter<void>();

    ngOnInit() {
        this.telegramLink = localStorage.getItem("tg_link");
    }
}
