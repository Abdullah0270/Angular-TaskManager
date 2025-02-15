import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../task.model'; // Ensure this path is correct

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', status: 'Pending' };
  isEditMode: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  // Load tasks from the database
  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    }, (error) => {
      console.error("Error fetching tasks:", error);
    });
  }

  // Add a new task
  addTask(task?: Task): void {
    if (!this.newTask.title.trim() || !this.newTask.description.trim() || !this.newTask.status.trim()) {
      alert('Title and description are required!');
      return;
    }

    this.taskService.addTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.resetForm();
    }, (error) => {
      console.error("Error adding task:", error);
    });
  }

  // Edit an existing task
  editTask(task: Task): void {
    this.newTask = { ...task };
    this.isEditMode = true;
  }

  // Update an existing task
  updateTask(task?: Task): void {
    if (!this.newTask.title.trim() || !this.newTask.description.trim()) {
      alert('Title and description are required!');
      return;
    }

    this.taskService.updateTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.isEditMode = false;
      this.resetForm();
    }, (error) => {
      console.error("Error updating task:", error);
    });
  }

  // Delete a task
  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      }, (error) => {
        console.error("Error deleting task:", error);
      });
    }
  }

  // Reset the form fields
  resetForm(): void {
    this.newTask = { id: 0, title: '', description: '', status: 'Pending' }; // Reset form
  }

  handleSaveTask(task: Task) {
    if (this.isEditMode) {
      this.updateTask(task);
    } else {
      this.addTask(task);
    }
  }
  
  handleCancelEdit() {
    this.isEditMode = false;
    this.newTask = { id: 0, title: '', description: '', status: 'Pending' };
  }
  
}
