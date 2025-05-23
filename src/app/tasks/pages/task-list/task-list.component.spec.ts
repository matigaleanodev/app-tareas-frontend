import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { of } from 'rxjs';
import { TaskService } from '@models/services/task/task.service';
import { AuthService } from '@auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { Task } from '@shared/models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Description',
    createdAt: new Date().toISOString(),
    completed: false,
  };

  beforeEach(() => {
    mockTaskService = jasmine.createSpyObj('TaskService', [
      'getAll',
      'createTask',
      'updateTask',
      'deleteTask',
    ]);
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a createTask y actualizar la lista', () => {
    mockTaskService.createTask.and.returnValue(of(mockTask));

    component.onCreateTask({
      title: mockTask.title,
      description: mockTask.description,
    });

    expect(mockTaskService.createTask).toHaveBeenCalled();
    expect(component.mostrarFormulario()).toBeFalse();
    expect(component.mostrarSpinner()).toBeFalse();
  });

  it('debería llamar a updateTask y actualizar la lista', () => {
    mockTaskService.updateTask.and.returnValue(of(mockTask));

    component.onUpdateTask(mockTask);

    expect(mockTaskService.updateTask).toHaveBeenCalledWith(mockTask);
    expect(component.selectedTask()).toBeUndefined();
    expect(component.mostrarFormulario()).toBeFalse();
    expect(component.mostrarSpinner()).toBeFalse();
  });

  it('debería llamar a deleteTask y eliminar la tarea de la lista', () => {
    component.selectedTask.set(mockTask);
    component['tasks'].set([mockTask]);
    mockTaskService.deleteTask.and.returnValue(of(mockTask));

    component['onDeleteTask']();

    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(mockTask.id);
    expect(component.selectedTask()).toBeUndefined();
    expect(component.tasks.value()).toEqual([]);
  });

  it('debería alternar el estado de completado de una tarea', () => {
    const updatedTask = { ...mockTask, completed: true };
    mockTaskService.updateTask.and.returnValue(of(updatedTask));

    component.changeTaskState(mockTask);

    expect(mockTaskService.updateTask).toHaveBeenCalled();
    expect(component.mostrarSpinner()).toBeFalse();
  });

  it('debería llamar a logout y redireccionar al login', async () => {
    mockAuthService.logout.and.returnValue(Promise.resolve());

    await component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
