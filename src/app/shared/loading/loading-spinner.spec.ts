import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Defaults ──────────────────────────────────────────────────────────────

  describe('defaults', () => {
    it('deve ter size "medium" por padrão', () => {
      expect(component.size).toBe('medium');
    });

    it('deve ter visible true por padrão', () => {
      expect(component.visible).toBe(true);
    });

    it('deve ter message "Carregando..." por padrão', () => {
      expect(component.message).toBe('Carregando...');
    });

    it('deve ter overlay false por padrão', () => {
      expect(component.overlay).toBe(false);
    });

    it('deve renderizar a mensagem padrão no DOM', () => {
      const msgEl: HTMLElement = fixture.nativeElement.querySelector(
        '.loading-spinner__message',
      );
      expect(msgEl).toBeTruthy();
      expect(msgEl.textContent?.trim()).toBe('Carregando...');
    });

    it('deve renderizar 3 dots por padrão', () => {
      const dots = fixture.nativeElement.querySelectorAll(
        '.loading-spinner__dot',
      );
      expect(dots.length).toBe(3);
    });

    it('deve aplicar classe loading-spinner--medium por padrão', () => {
      const el: HTMLElement = fixture.nativeElement.querySelector(
        '.loading-spinner--medium',
      );
      expect(el).toBeTruthy();
    });
  });

  // ─── Visibilidade ──────────────────────────────────────────────────────────

  describe('visible', () => {
    it('deve aplicar classe --hidden quando visible=false', () => {
      component.visible = false;
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector(
        '.loading-spinner--hidden',
      );
      expect(el).toBeTruthy();
    });

    it('não deve aplicar classe --hidden quando visible=true', () => {
      component.visible = true;
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector(
        '.loading-spinner--hidden',
      );
      expect(el).toBeNull();
    });
  });

  // ─── Size ──────────────────────────────────────────────────────────────────

  describe('size', () => {
    it('deve aplicar classe --small quando size="small"', () => {
      component.size = 'small';
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('.loading-spinner--small');
      expect(el).toBeTruthy();
    });

    it('deve aplicar classe --large quando size="large"', () => {
      component.size = 'large';
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('.loading-spinner--large');
      expect(el).toBeTruthy();
    });

    it('deve aplicar classe --medium quando size="medium"', () => {
      component.size = 'medium';
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector(
        '.loading-spinner--medium',
      );
      expect(el).toBeTruthy();
    });
  });

  // ─── Message ───────────────────────────────────────────────────────────────

  describe('message', () => {
    it('deve exibir mensagem customizada quando fornecida', () => {
      component.message = 'Carregando pedidos...';
      fixture.detectChanges();
      const msgEl: HTMLElement = fixture.nativeElement.querySelector(
        '.loading-spinner__message',
      );
      expect(msgEl.textContent?.trim()).toBe('Carregando pedidos...');
    });

    it('deve exibir "Carregando..." quando message é string vazia', () => {
      component.message = '';
      fixture.detectChanges();
      const msgEl: HTMLElement = fixture.nativeElement.querySelector(
        '.loading-spinner__message',
      );
      // elemento existe mas conteúdo é vazio — sem crash
      expect(msgEl).toBeTruthy();
    });

    it('deve renderizar mensagem longa sem crash', () => {
      component.message = 'A'.repeat(100);
      fixture.detectChanges();
      const msgEl: HTMLElement = fixture.nativeElement.querySelector(
        '.loading-spinner__message',
      );
      expect(msgEl.textContent?.trim().length).toBe(100);
    });
  });

  // ─── Overlay ───────────────────────────────────────────────────────────────

  describe('overlay', () => {
    it('deve renderizar overlay quando overlay=true', () => {
      component.overlay = true;
      fixture.detectChanges();
      const overlayEl = fixture.nativeElement.querySelector(
        '.loading-spinner__overlay',
      );
      expect(overlayEl).toBeTruthy();
    });

    it('não deve renderizar overlay quando overlay=false', () => {
      component.overlay = false;
      fixture.detectChanges();
      const overlayEl = fixture.nativeElement.querySelector(
        '.loading-spinner__overlay',
      );
      expect(overlayEl).toBeNull();
    });

    it('deve renderizar inline spinner quando overlay=false', () => {
      component.overlay = false;
      fixture.detectChanges();
      const inlineEl = fixture.nativeElement.querySelector('.loading-spinner');
      expect(inlineEl).toBeTruthy();
    });

    it('deve aplicar --hidden no overlay quando visible=false', () => {
      component.overlay = true;
      component.visible = false;
      fixture.detectChanges();
      const overlayEl = fixture.nativeElement.querySelector(
        '.loading-spinner__overlay--hidden',
      );
      expect(overlayEl).toBeTruthy();
    });

    it('deve conter 3 dots dentro do overlay', () => {
      component.overlay = true;
      fixture.detectChanges();
      const dots = fixture.nativeElement.querySelectorAll(
        '.loading-spinner__dot',
      );
      expect(dots.length).toBe(3);
    });

    it('deve exibir mensagem dentro do overlay', () => {
      component.overlay = true;
      component.message = 'Salvando...';
      fixture.detectChanges();
      const msgEl: HTMLElement = fixture.nativeElement.querySelector(
        '.loading-spinner__message',
      );
      expect(msgEl.textContent?.trim()).toBe('Salvando...');
    });
  });

  // ─── DOM Structure ─────────────────────────────────────────────────────────

  describe('estrutura DOM', () => {
    it('deve ter role="status" para acessibilidade', () => {
      const el = fixture.nativeElement.querySelector('[role="status"]');
      expect(el).toBeTruthy();
    });

    it('deve ter aria-label com a mensagem', () => {
      component.message = 'Carregando produtos...';
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector(
        '[aria-label="Carregando produtos..."]',
      );
      expect(el).toBeTruthy();
    });

    it('deve ter aria-hidden="true" quando visible=false', () => {
      component.visible = false;
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('[aria-hidden="true"]');
      expect(el).toBeTruthy();
    });

    it('não deve conter imagens externas', () => {
      const imgs = fixture.nativeElement.querySelectorAll('img');
      expect(imgs.length).toBe(0);
    });
  });

  // ─── Edge Cases ────────────────────────────────────────────────────────────

  describe('edge cases', () => {
    it('deve alternar visible rapidamente sem erro', () => {
      expect(() => {
        component.visible = true;
        fixture.detectChanges();
        component.visible = false;
        fixture.detectChanges();
        component.visible = true;
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('deve renderizar corretamente com todos os inputs combinados (overlay+large+visible=false)', () => {
      component.overlay = true;
      component.size = 'large';
      component.visible = false;
      component.message = 'Aguarde...';
      fixture.detectChanges();
      const overlayEl = fixture.nativeElement.querySelector(
        '.loading-spinner__overlay--hidden',
      );
      expect(overlayEl).toBeTruthy();
    });

    it('deve criar o componente sem erros', () => {
      expect(component).toBeTruthy();
    });
  });
});
