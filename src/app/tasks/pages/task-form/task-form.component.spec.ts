import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Task } from '@shared/models/task.model';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [TaskFormComponent, ReactiveFormsModule],
  template: `<app-task-form
    [task]="task"
    (createTask)="onCreate($event)"
    (updateTask)="onUpdate($event)"
    (cancelar)="onCancel()"
  ></app-task-form>`,
})
class TestHostComponent {
  task?: Task;
  createdTask?: any;
  updatedTask?: any;
  cancelled = false;

  onCreate(task: any) {
    this.createdTask = task;
  }

  onUpdate(task: any) {
    this.updatedTask = task;
  }

  onCancel() {
    this.cancelled = true;
  }
}

describe('TaskFormComponent dentro de HostComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear correctamente el host y el componente', () => {
    expect(host).toBeTruthy();
  });

  it('debería emitir createTask si no hay task', () => {
    const form = fixture.debugElement.query(By.directive(TaskFormComponent))
      .componentInstance.form;
    form.setValue({
      title: 'Nueva tarea',
      description: 'Descripción de prueba',
    });

    fixture.debugElement
      .query(By.directive(TaskFormComponent))
      .componentInstance.onSubmit();

    expect(host.createdTask).toEqual({
      title: 'Nueva tarea',
      description: 'Descripción de prueba',
    });
  });

  it('debería emitir updateTask si hay task', () => {
    host.task = {
      id: '1',
      title: 'Vieja',
      description: 'Vieja desc',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.directive(TaskFormComponent))
      .componentInstance.form;
    form.setValue({ title: 'Actualizada', description: 'Desc nueva' });

    fixture.debugElement
      .query(By.directive(TaskFormComponent))
      .componentInstance.onSubmit();

    expect(host.updatedTask).toEqual({
      ...host.task,
      title: 'Actualizada',
      description: 'Desc nueva',
    });
  });

  it('no debería emitir si el formulario es inválido', () => {
    const form = fixture.debugElement.query(By.directive(TaskFormComponent))
      .componentInstance.form;
    form.setValue({ title: '', description: '' });

    fixture.debugElement
      .query(By.directive(TaskFormComponent))
      .componentInstance.onSubmit();

    expect(host.createdTask).toBeUndefined();
    expect(host.updatedTask).toBeUndefined();
  });

  it('debería emitir cancelar cuando se llama onCancel', () => {
    fixture.debugElement
      .query(By.directive(TaskFormComponent))
      .componentInstance.onCancel();

    expect(host.cancelled).toBeTrue();
  });

  it('debería patchear valores del form cuando cambia task', () => {
    host.task = {
      id: '2',
      title: 'Patcheada',
      description: 'Desc',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.directive(TaskFormComponent))
      .componentInstance.form;

    expect(form.value.title).toBe('Patcheada');
    expect(form.value.description).toBe('Desc');
  });
});
