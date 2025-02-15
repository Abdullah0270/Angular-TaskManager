import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { catchError, map,switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // JSON Server API

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // addTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(this.apiUrl, task);
  // }
  addTask(task: Task): Observable<Task> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((tasks) => {
        // Filter out undefined id values before calculating the next ID
        const validIds = tasks
          .map(t => t.id)
          .filter(id => id !== undefined) as number[]; // Ensure we only work with numbers
        
        const nextId = validIds.length ? Math.max(...validIds) + 1 : 1;

        // Create a new user object with the generated ID
        return { ...task, id: nextId };
      }),
      switchMap((newTask: Task) => {
        // Now post the new user to the API
        return this.http.post<Task>(this.apiUrl, newTask).pipe(
          catchError((error) => {
            console.error('Error adding task:', error);
            throw error;
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching task for ID calculation:', error);
        throw error;
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
