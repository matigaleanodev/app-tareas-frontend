import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteTaskComponent } from './confirm-delete-task.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-host',
  template: `<app-confirm-delete-task
    [open]="open()"
    [task]="task()"
    (cancel)="onCancel()"
    (confirm)="onConfirm()"
  ></app-confirm-delete-task>`,
  standalone: true,
  imports: [ConfirmDeleteTaskComponent],
})
class TestHostComponent {
  open = signal(false);
  task = signal({ id: '1', title: 'Test Task', description: 'desc' });
  cancelCalled = false;
  confirmCalled = false;

  onCancel() {
    this.cancelCalled = true;
  }
  onConfirm() {
    this.confirmCalled = true;
  }
}

describe('ConfirmDeleteTaskComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('no debería mostrar el modal si open es false', () => {
    expect(compiled.querySelector('article')).toBeNull();
  });

  it('debería mostrar el modal con el título de la tarea cuando open es true', () => {
    host.open.set(true);
    fixture.detectChanges();

    const modal = compiled.querySelector('article');
    expect(modal).toBeTruthy();
    expect(modal?.textContent).toContain('¿Eliminar esta tarea?');
    expect(modal?.textContent).toContain('Test Task');
  });

  it('debería emitir confirm cuando se clickea "Sí, eliminar"', () => {
    host.open.set(true);
    fixture.detectChanges();

    const confirmBtn = compiled.querySelector(
      'button.bg-red-600'
    ) as HTMLButtonElement;
    confirmBtn.click();
    fixture.detectChanges();

    expect(host.confirmCalled).toBeTrue();
  });

  it('debería emitir cancel cuando se clickea "Cancelar"', () => {
    host.open.set(true);
    fixture.detectChanges();

    const cancelBtn = compiled.querySelector(
      'button.bg-gray-300'
    ) as HTMLButtonElement;
    cancelBtn.click();
    fixture.detectChanges();

    expect(host.cancelCalled).toBeTrue();
  });
});
