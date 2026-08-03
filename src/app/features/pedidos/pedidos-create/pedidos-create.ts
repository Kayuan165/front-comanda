import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Produto } from '../../../core/models/produto.interface';
import { ProdutoService } from '../../../core/services/produto.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreatePedidoDto } from '../../../core/models/pedido.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CurrencyBrPipe } from '../../../shared/pipes/currency-br.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { AuthService } from '../../../core/auth/auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CurrencyMaskDirective } from '../../../shared/directives/currency-mask.directive';
import { LoadingSpinnerComponent } from '../../../shared/loading/loading-spinner';

@Component({
  selector: 'app-pedidos-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatOptionModule,
    MatRadioModule,
    CurrencyBrPipe,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    CurrencyMaskDirective,
    LoadingSpinnerComponent,
  ],
  standalone: true,
  templateUrl: './pedidos-create.html',
  styleUrl: './pedidos-create.scss',
})
export class PedidosCreate implements OnInit {
  pedidoForm: FormGroup;
  produtos: Produto[] = [];
  todosProdutos: Produto[] = [];
  loading: boolean = false;
  showProdutoSelector: boolean = false;
  currentItemIndex: number | null = null;
  filtroDescricao: string = '';

  formasPagamento = [
    { value: 'dinheiro', label: 'Dinheiro' },
    { value: 'pix', label: 'PIX' },
    { value: 'cartão crédito', label: 'Cartão de Crédito' },
    { value: 'cartão débito', label: 'Cartão de Débito' },
  ];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private snackbar: MatSnackBar,
    private route: Router,
    private authService: AuthService,
  ) {
    this.pedidoForm = this.fb.group({
      cliente: ['', [Validators.required, Validators.minLength(2)]],
      status: [true, Validators.required],
      agendado: [false],
      dataAgendamento: [null],
      horaAgendamento: [''],
      observacao: [''],
      itens: this.fb.array([]),
      pagamentos: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
    this.setupFormValidation();
    this.adicionarFormaPagamento();
  }

  onInputChange(event: Event): void {
    const descricao = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();

    if (!descricao) {
      this.produtos = [...this.todosProdutos];
      return;
    }

    this.produtos = this.todosProdutos.filter((produto) =>
      produto.descricao.toLowerCase().includes(descricao),
    );
  }

  minDate: Date = new Date();
  horariosDisponiveis: string[] = this.gerarHorariosDisponiveis();

  gerarHorariosDisponiveis(): string[] {
    const horarios: string[] = [];
    for (let hora = 8; hora <= 22; hora++) {
      horarios.push(`${hora.toString().padStart(2, '0')}:00`);
      horarios.push(`${hora.toString().padStart(2, '0')}:30`);
    }
    return horarios;
  }

  formatarHora(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (valor.length > 4) {
      valor = valor.substring(0, 4);
    }

    if (valor.length >= 3) {
      valor = valor.substring(0, 2) + ':' + valor.substring(2);
    }

    input.value = valor;
    this.pedidoForm.get('horaAgendamento')?.setValue(valor);
  }

  validarHora(): void {
    const horaControl = this.pedidoForm.get('horaAgendamento');
    const valor = horaControl?.value || '';

    if (valor && valor.length === 5) {
      const [hora, minuto] = valor.split(':').map(Number);
      if (hora < 0 || hora > 23 || minuto < 0 || minuto > 59) {
        horaControl?.setErrors({ horaInvalida: true });
      }
    }
  }

  setupFormValidation(): void {
    this.pedidoForm.get('agendado')?.valueChanges.subscribe((agendado) => {
      const dataControl = this.pedidoForm.get('dataAgendamento');
      const horaControl = this.pedidoForm.get('horaAgendamento');

      if (agendado) {
        dataControl?.setValidators([Validators.required]);
        horaControl?.setValidators([
          Validators.required,
          Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
        ]);
      } else {
        dataControl?.clearValidators();
        horaControl?.clearValidators();
        dataControl?.setValue(null);
        horaControl?.setValue('');
      }
      dataControl?.updateValueAndValidity();
      horaControl?.updateValueAndValidity();
    });
  }

  get itensFormArray(): FormArray {
    return this.pedidoForm.get('itens') as FormArray;
  }

  get pagamentosFormArray(): FormArray {
    return this.pedidoForm.get('pagamentos') as FormArray;
  }

  carregarProdutos(): void {
    this.produtoService.getAllProdutos().subscribe({
      next: (produtos) => {
        const ativos = produtos.filter((p) => p.ativo);
        this.todosProdutos = ativos;
        this.produtos = [...ativos];
      },
      error: (err) => {
        this.snackbar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  criarItemPedidos(produto?: Produto): FormGroup {
    return this.fb.group({
      produto: [produto?._id || '', Validators.required],
      nome: [produto?.descricao || '', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      precoUnitario: [
        produto?.preco || 0,
        [Validators.required, Validators.min(0)],
      ],
      adicionais: this.fb.array([]),
      status: [true, Validators.required],
    });
  }

  criarFormaPagamento(): FormGroup {
    return this.fb.group({
      tipo: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      trocoPara: [null],
    });
  }

  adicionarItem(): void {
    this.showProdutoSelector = true;
    this.currentItemIndex = null;
    this.filtroDescricao = '';
    this.produtos = [...this.todosProdutos];
  }

  selecionarProduto(produto: Produto): void {
    const novoItem = this.criarItemPedidos(produto);
    this.itensFormArray.push(novoItem);
    this.showProdutoSelector = false;
    this.calcularTotal();
  }

  editarItem(index: number): void {
    this.currentItemIndex = index;
    this.showProdutoSelector = true;
  }

  removerItem(index: number): void {
    this.itensFormArray.removeAt(index);
    this.calcularTotal();
  }

  atualizarQuantidade(index: number, novaQuantidade: number): void {
    if (novaQuantidade >= 1) {
      const item = this.itensFormArray.at(index);
      item.patchValue({ quantidade: novaQuantidade });
      this.calcularTotal();
    }
  }

  adicionarFormaPagamento(): void {
    this.pagamentosFormArray.push(this.criarFormaPagamento());
  }

  removerFormaPagamento(index: number): void {
    this.pagamentosFormArray.removeAt(index);
    this.calcularTotal();
  }

  calcularSubtotal(): number {
    let subtotal = 0;

    this.itensFormArray.controls.forEach((item) => {
      const quantidade = item.get('quantidade')?.value || 0;
      const preco = item.get('precoUnitario')?.value || 0;

      subtotal += quantidade * preco;
    });

    return subtotal;
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    return subtotal;
  }

  validarPagamentos(): boolean {
    const total = this.calcularTotal();
    let totalPago = 0;

    this.pagamentosFormArray.controls.forEach((pagamento) => {
      totalPago += pagamento.get('valor')?.value || 0;
    });

    return Math.abs(total - totalPago) < 0.01;
  }

  onSubmit(): void {
    if (this.pedidoForm.invalid) {
      this.markFormGroupTouched();
      this.snackbar.open(
        'Formulário inválido. Verifique os campos.',
        'Fechar',
        {
          duration: 3000,
        },
      );
      return;
    }

    if (this.itensFormArray.length === 0) {
      this.snackbar.open('Adicione ao menos um item ao pedido.', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    if (!this.validarPagamentos()) {
      this.snackbar.open(
        'O total dos pagamentos não corresponde ao valor do pedido.',
        'Fechar',
        {
          duration: 3000,
        },
      );
      return;
    }

    this.loading = true;

    const userId = this.authService.getUserId();
    if (!userId) {
      this.snackbar.open('Usuário não autenticado.', 'Fechar', {
        duration: 3000,
      });
      this.authService.logout();
      return;
    }

    const formValue = this.pedidoForm.value;

    let horarioAgendamento: string | undefined;
    if (
      formValue.agendado &&
      formValue.dataAgendamento &&
      formValue.horaAgendamento
    ) {
      const data = new Date(formValue.dataAgendamento);
      const [horas, minutos] = formValue.horaAgendamento.split(':');
      data.setHours(parseInt(horas, 10), parseInt(minutos, 10), 0, 0);
      horarioAgendamento = data.toISOString();
    }

    const pedidoDto: CreatePedidoDto = {
      usuario: userId,
      cliente: formValue.cliente,
      itens: formValue.itens,
      pagamentos: formValue.pagamentos,
      valorTotal: this.calcularTotal(),
      agendado: formValue.agendado,
      horarioAgendamento: horarioAgendamento,
      pago: true,
      observacao: formValue.observacao,
      status: formValue.status,
    };

    this.pedidoService.criarPedido(pedidoDto).subscribe({
      next: (response) => {
        const snackBarRef = this.snackbar.open(
          'Pedido criado com sucesso!',
          'Ver Pedidos',
          {
            duration: 5000,
          },
        );

        snackBarRef.onAction().subscribe(() => {
          this.route.navigate(['/pedidos']);
        });

        this.resetarFormulario();
      },

      error: (err) => {
        this.loading = false;
        this.snackbar.open('Erro ao criar pedido. Tente novamente.', 'Fechar', {
          duration: 3000,
        });
      },

      complete: () => {
        this.loading = false;
      },
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.pedidoForm.controls).forEach((key) => {
      const control = this.pedidoForm.get(key);
      control?.markAsTouched();

      if (control instanceof FormArray) {
        control.controls.forEach((group) => {
          if (group instanceof FormGroup) {
            Object.keys(group.controls).forEach((innerKeys) => {
              group.get(innerKeys)?.markAsTouched();
            });
          }
        });
      }
    });
  }

  fecharSeletorProduto() {
    this.showProdutoSelector = false;
    this.currentItemIndex = null;
    this.filtroDescricao = '';
    this.produtos = [];
  }

  private resetarFormulario(): void {
    while (this.itensFormArray.length > 0) {
      this.itensFormArray.removeAt(0);
    }

    while (this.pagamentosFormArray.length > 0) {
      this.pagamentosFormArray.removeAt(0);
    }

    this.pedidoForm.reset({
      cliente: '',
      status: true,
      agendado: false,
      dataAgendamento: null,
      horaAgendamento: '',
      observacao: '',
    });

    this.adicionarFormaPagamento();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackByProdutoId(index: number, produto: Produto): string {
    return produto._id || index.toString();
  }
}
