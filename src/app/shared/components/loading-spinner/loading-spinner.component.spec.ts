import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-host',
  template: `<app-loading-spinner
    [mostrar]="mostrar()"
    [texto]="texto()"
  ></app-loading-spinner>`,
  standalone: true,
  imports: [LoadingSpinnerComponent],
})
class TestHostComponent {
  mostrar = signal(false);
  texto = signal('Cargando datos...');
}

describe('LoadingSpinnerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('no debería mostrar el spinner si mostrar es false', () => {
    expect(compiled.querySelector('div[role="status"]')).toBeNull();
  });

  it('debería mostrar el spinner y el texto por defecto si mostrar es true', () => {
    host.mostrar.set(true);
    fixture.detectChanges();

    const spinner = compiled.querySelector('div[role="status"]');
    expect(spinner).toBeTruthy();
    expect(spinner?.textContent).toContain('Cargando datos...');
  });

  it('debería mostrar el texto personalizado cuando se pasa otro valor en texto', () => {
    host.mostrar.set(true);
    host.texto.set('Esperá un toque...');
    fixture.detectChanges();

    const textoEl = compiled.querySelector('p');
    expect(textoEl?.textContent).toBe('Esperá un toque...');
  });
});
