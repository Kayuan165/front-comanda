import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, signal } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  imports: [CommonModule],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.scss',
})
export class ModalDelete {
  private _isOpen = signal(false);

  @Input()
  set isOpen(value: boolean) {
    this._isOpen.set(value);
  }

  get isOpen(): boolean {
    return this._isOpen();
  }

  @Input() title: string = 'Excluir Produto';
  @Input() close = new EventEmitter<void>();
  @Input() confirm = new EventEmitter<void>();

  closeModal(): void {
    this._isOpen.set(false);
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
