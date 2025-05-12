import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  username: any;
  id: string,
  task_name: string;
  task_status: string;
  deadline: any;
  userId: string,
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  //ustawienie serwera połączenia z bazą danych
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  //dodawanie zadań
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  //pokazywanie zadan dla usera
  getTasksForUser(userId: string, status: string = '') {
    let url = `http://localhost:3000/tasks?userId=${userId}`;
    if (status) {
      url += `&status=${encodeURIComponent(status)}`;
    }
    return this.http.get<Task[]>(url);
  }
  
  // edytowanie zadania
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // usuwanie zadania
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); 
  }

  //wszystkie taski do kalendarza
  getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>('http://localhost:3000/all-tasks');
  }
}
