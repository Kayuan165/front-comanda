import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.scss',
})
export class ModalDelete {

  @Input() isOpen: boolean = false;
  @Input() title: string = 'Excluir Produto';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
