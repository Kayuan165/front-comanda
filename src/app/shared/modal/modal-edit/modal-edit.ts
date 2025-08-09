import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  Signal,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-modal-edit',
  imports: [CommonModule],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.scss',
})
export class ModalEdit {
  private _isOpen = signal(false);

  @Input()
  set isOpen(value: boolean) {
    this._isOpen.set(value);
  }

  get isOpen(): boolean {
    return this._isOpen();
  }

  @Input() title: string = '';
  @Input() close = new EventEmitter<void>();
  @Input() confirm = new EventEmitter<void>();

  isVisible: Signal<boolean> = computed(() => this._isOpen());

  closeModal(): void {
    this._isOpen.set(false);
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
