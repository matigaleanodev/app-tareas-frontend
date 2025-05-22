import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '@shared/models/task.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _http = inject(HttpClient);
  private _api = environment.API;

  getAll(): Observable<Task[]> {
    return this._http.get<Task[]>(this._api);
  }

  getById(id: string): Observable<Task> {
    return this._http.get<Task>(`${this._api}/${id}`);
  }

  create(task: Task): Observable<Task> {
    return this._http.post<Task>(this._api, task);
  }

  update(id: string, task: Partial<Task>): Observable<Task> {
    return this._http.put<Task>(`${this._api}/${id}`, task);
  }

  delete(id: string): Observable<Task> {
    return this._http.delete<Task>(`${this._api}/${id}`);
  }
}
