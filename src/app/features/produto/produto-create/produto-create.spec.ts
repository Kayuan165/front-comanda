import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCreate } from './produto-create';

describe('ProdutoCreate', () => {
  let component: ProdutoCreate;
  let fixture: ComponentFixture<ProdutoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
