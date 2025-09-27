import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarPedido } from './vizualizar-pedido';

describe('VizualizarPedido', () => {
  let component: VizualizarPedido;
  let fixture: ComponentFixture<VizualizarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizarPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizualizarPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
