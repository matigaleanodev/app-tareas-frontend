import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateTask, Task } from '@shared/models/task.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _http = inject(HttpClient);
  private _api = environment.API;

  getAll(): Observable<Task[]> {
    return this._http.get<Task[]>(`${this._api}/tasks`);
  }

  getTaskById(id: string): Observable<Task> {
    return this._http.get<Task>(`${this._api}/tasks/${id}`);
  }

  createTask(task: CreateTask): Observable<Task> {
    return this._http.post<Task>(`${this._api}/tasks`, task);
  }

  updateTask(task: Partial<Task>): Observable<Task> {
    return this._http.put<Task>(`${this._api}/tasks/${task.id}`, task);
  }

  deleteTask(id: string): Observable<Task> {
    return this._http.delete<Task>(`${this._api}/tasks/${id}`);
  }
}
