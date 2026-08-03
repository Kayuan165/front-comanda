import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './modal-confirm.html',
  styleUrl: './modal-confirm.scss',
})
export class ModalConfirm {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Confirmação';
  @Input() confirmButtonText: string = 'Confirmar';
  @Input() cancelButtonText: string = 'Cancelar';
  @Input() confirmButtonType: 'primary' | 'danger' | 'success' | 'warning' =
    'primary';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  getConfirmButtonClass(): string {
    return `btn btn-${this.confirmButtonType}`;
  }
}
