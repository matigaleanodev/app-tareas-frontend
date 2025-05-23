import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegisterModalComponent } from './confirm-register-modal.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [ConfirmRegisterModalComponent],
  template: `
    <app-confirm-register-modal
      [open]="open"
      (cancel)="onCancel()"
      (confirm)="onConfirm()"
    ></app-confirm-register-modal>
  `,
})
class TestHostComponent {
  open = false;
  cancelCalled = false;
  confirmCalled = false;

  onCancel() {
    this.cancelCalled = true;
  }

  onConfirm() {
    this.confirmCalled = true;
  }
}

describe('ConfirmRegisterModalComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('no debería renderizar el modal cuando open es false', () => {
    host.open = false;
    fixture.detectChanges();

    const modalDiv = fixture.debugElement.query(By.css('div.fixed.inset-0'));
    expect(modalDiv).toBeNull();
  });

  it('debería renderizar el modal cuando open es true', () => {
    host.open = true;
    fixture.detectChanges();

    const modalDiv = fixture.debugElement.query(By.css('div.fixed.inset-0'));
    expect(modalDiv).not.toBeNull();

    const title = modalDiv.nativeElement.querySelector('h2#modal-title');
    expect(title.textContent).toContain('¿Deseás registrarte?');
  });

  it('debería emitir cancel cuando se clickea el botón Cancelar', () => {
    host.open = true;
    fixture.detectChanges();

    const cancelBtn = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    cancelBtn.click();
    fixture.detectChanges();

    expect(host.cancelCalled).toBeTrue();
  });

  it('debería emitir confirm cuando se clickea el botón Sí, registrarme', () => {
    host.open = true;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const confirmBtn = buttons[1].nativeElement;

    confirmBtn.click();
    fixture.detectChanges();

    expect(host.confirmCalled).toBeTrue();
  });
});
