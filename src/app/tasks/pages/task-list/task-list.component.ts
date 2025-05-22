import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '@models/services/task/task.service';
import { Task } from '@shared/models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);
  readonly tasks = signal<Task[]>([
    {
      id: '1',
      title: 'Comprar víveres',
      description: 'Ir al súper y comprar comida para la semana',
      completed: false,
      createdAt: new Date('2025-05-20').toISOString(),
    },
    {
      id: '2',
      title: 'Estudiar Angular',
      description: 'Repasar signals, standalone components y routing',
      completed: true,
      createdAt: new Date('2025-05-18').toISOString(),
    },
    {
      id: '3',
      title: 'Llamar a Juan',
      description: 'Coordinar salida para el finde',
      completed: false,
      createdAt: new Date('2025-05-17').toISOString(),
    },
    {
      id: '4',
      title: 'Enviar CV',
      description: 'Mandar el CV a la empresa de tecnología de Posadas',
      completed: false,
      createdAt: new Date('2025-05-15').toISOString(),
    },
    {
      id: '5',
      title: 'Pagar servicios',
      description: 'Luz, internet y agua',
      completed: true,
      createdAt: new Date('2025-05-14').toISOString(),
    },
    {
      id: '6',
      title: 'Hacer ejercicio',
      description: 'Salir a correr o ir al gimnasio',
      completed: false,
      createdAt: new Date('2025-05-14').toISOString(),
    },
    {
      id: '7',
      title: 'Limpiar la casa',
      description: 'Dedicar 1 hora a ordenar y limpiar',
      completed: true,
      createdAt: new Date('2025-05-13').toISOString(),
    },
    {
      id: '8',
      title: 'Actualizar portfolio',
      description: 'Agregar nuevos proyectos con Angular y NestJS',
      completed: false,
      createdAt: new Date('2025-05-12').toISOString(),
    },
    {
      id: '9',
      title: 'Ver serie pendiente',
      description: 'Terminar la temporada nueva de esa serie',
      completed: false,
      createdAt: new Date('2025-05-11').toISOString(),
    },
    {
      id: '10',
      title: 'Probar Docker',
      description: 'Iniciar pruebas locales para montar servicios',
      completed: true,
      createdAt: new Date('2025-05-10').toISOString(),
    },
  ]);
}
