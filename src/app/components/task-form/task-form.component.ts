// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Task } from '../../task.model';

// @Component({
//   selector: 'app-task-form',
//   templateUrl: './task-form.component.html',
//   styleUrls: ['./task-form.component.css']
// })
// export class TaskFormComponent {
//   @Input() task: Task = { id: 0, title: '', description: '' };
//   @Input() isEditMode: boolean = false;
//   @Output() saveTask = new EventEmitter<Task>();

//   onSubmit() {
//     if (!this.task.title || !this.task.description) {
//       alert('Title and description are required!');
//       return;
//     }
//     this.saveTask.emit(this.task);
//   }
// }
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() task: Task = { id: 0, title: '', description: '', status: 'Pending' };
  @Input() isEditMode: boolean = false;
  @Output() saveTask = new EventEmitter<Task>();
  @Output() cancelEdit = new EventEmitter<void>();

  // Emit save event with task data
  onSubmit() {
    if (!this.task.title.trim() || !this.task.description.trim() || !this.task.status.trim()) {
      alert('Both title and description are required!');
      return;
    }
    this.saveTask.emit(this.task);
  }

  // Emit cancel event
  onCancel() {
    this.cancelEdit.emit();
  }
}
