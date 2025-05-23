import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

describe('TaskService', () => {
  let service: TaskService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const apiUrl = environment.API;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(TaskService);
  });

  it('getAll debería retornar tareas ordenadas por fecha desc', (done: DoneFn) => {
    const fakeTasks = [
      { id: '1', title: 'Tarea 1', createdAt: '2025-05-22T10:00:00Z' },
      { id: '2', title: 'Tarea 2', createdAt: '2025-05-23T10:00:00Z' },
    ];

    httpClientSpy.get.and.returnValue(of(fakeTasks));

    service.getAll().subscribe({
      next: (tasks) => {
        expect(httpClientSpy.get).toHaveBeenCalledWith(`${apiUrl}/tasks`);
        expect(tasks.length).toBe(2);
        expect(tasks[0].id).toBe('2'); // la más nueva primero
        expect(tasks[1].id).toBe('1');
        done();
      },
      error: done.fail,
    });
  });

  it('getTaskById debería retornar tarea por id', (done: DoneFn) => {
    const fakeTask = {
      id: '1',
      title: 'Tarea 1',
      description: 'Descripción de la tarea',
      createdAt: new Date().toISOString(),
      completed: false,
    };

    httpClientSpy.get.and.returnValue(of(fakeTask));

    service.getTaskById('1').subscribe({
      next: (task) => {
        expect(httpClientSpy.get).toHaveBeenCalledWith(`${apiUrl}/tasks/1`);
        expect(task).toEqual(fakeTask);
        done();
      },
      error: done.fail,
    });
  });

  it('createTask debería crear y devolver la tarea', (done: DoneFn) => {
    const newTask = { title: 'Tarea nueva', description: 'descripcion tarea' };
    const createdTask = {
      id: '3',
      title: 'Tarea nueva',
      description: 'descripcion tarea',
      createdAt: new Date().toISOString(),
      completed: false,
    };

    httpClientSpy.post.and.returnValue(of(createdTask));

    service.createTask(newTask).subscribe({
      next: (task) => {
        expect(httpClientSpy.post).toHaveBeenCalledWith(
          `${apiUrl}/tasks`,
          newTask
        );
        expect(task).toEqual(createdTask);
        done();
      },
      error: done.fail,
    });
  });

  it('updateTask debería actualizar y devolver la tarea', (done: DoneFn) => {
    const updatedTask = {
      id: '1',
      title: 'Tarea actualizada',
      description: 'descripcion tarea',
      createdAt: new Date().toISOString(),
      completed: false,
    };

    httpClientSpy.put.and.returnValue(of(updatedTask));

    service.updateTask(updatedTask).subscribe({
      next: (task) => {
        expect(httpClientSpy.put).toHaveBeenCalledWith(
          `${apiUrl}/tasks/${updatedTask.id}`,
          updatedTask
        );
        expect(task).toEqual(updatedTask);
        done();
      },
      error: done.fail,
    });
  });

  it('deleteTask debería eliminar y devolver la tarea', (done: DoneFn) => {
    const deletedTask = {
      id: '1',
      title: 'Tarea a eliminar',
      description: 'descripcion tarea',
      createdAt: new Date().toISOString(),
      completed: false,
    };

    httpClientSpy.delete.and.returnValue(of(deletedTask));

    service.deleteTask('1').subscribe({
      next: (task) => {
        expect(httpClientSpy.delete).toHaveBeenCalledWith(`${apiUrl}/tasks/1`);
        expect(task).toEqual(deletedTask);
        done();
      },
      error: done.fail,
    });
  });
});
