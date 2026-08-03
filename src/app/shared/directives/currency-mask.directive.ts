import {
  Directive,
  ElementRef,
  HostListener,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMaskDirective),
      multi: true,
    },
  ],
})
export class CurrencyMaskDirective implements ControlValueAccessor {
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorFormatado = this.formatarValor(input.value);
    input.value = valorFormatado;

    const valorNumerico = this.converterParaNumero(valorFormatado);
    this.onChange(valorNumerico);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  @HostListener('focus')
  onFocus(): void {
    setTimeout(() => {
      this.el.nativeElement.select();
    }, 0);
  }

  writeValue(value: number | null): void {
    if (value !== null && value !== undefined) {
      this.el.nativeElement.value = this.formatarNumeroParaExibicao(value);
    } else {
      this.el.nativeElement.value = '';
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  private formatarValor(valor: string): string {
    let apenasNumeros = valor.replace(/\D/g, '');

    if (!apenasNumeros) {
      return '';
    }

    const valorEmCentavos = parseInt(apenasNumeros, 10);
    const valorEmReais = valorEmCentavos / 100;

    return valorEmReais.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  private formatarNumeroParaExibicao(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  private converterParaNumero(valorFormatado: string): number | null {
    if (!valorFormatado) {
      return null;
    }

    const valorLimpo = valorFormatado.replace(/\./g, '').replace(',', '.');

    const numero = parseFloat(valorLimpo);
    return isNaN(numero) ? null : numero;
  }
}
