import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-my-calendar-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarComponent],
  templateUrl: './my-calendar-page.component.html',
  styleUrl: './my-calendar-page.component.css'
})
export class MyCalendarPageComponent {
  tasks: Task[] = [];
  newTask: Task = {
    id: '', task_name: '', task_status: '', deadline: '', userId: '',
    username: undefined
  };
  userId: string ='';

  constructor(private taskService: TaskService) {}

  // interface do meetingow
  get meetings(): { [date: string]: string[] } {
    const result: { [date: string]: string[] } = {};

    for (const task of this.tasks) {
      if (!task.deadline || task.deadline === null) continue;

      const date = task.deadline;

      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(task.task_name);
    }
    return result;
  }
    // formatowanie daty
    formatDate(dateString: string): string {
      if (dateString === null || !dateString) return '-';
      //const date = new Date(dateString);
      return DateTime.fromISO(dateString, { zone: 'utc' }).startOf('day').toFormat('yyyy-MM-dd');
    }
  // pokazywanie istniejacych zadan
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userId = user?.Uid;
    this.fetchTasks();
  }
// zebranie zadan w calosc
fetchTasks() {
  if (!this.userId) return;
  this.tasks = [];
  this.taskService.getTasksForUser(this.userId).subscribe((tasks) => {
    this.tasks = tasks
    .map(task => ({
      ...task,
      deadline: task.deadline === null || task.deadline === '-' ? '-' : this.formatDate(task.deadline)
    }))
  });
}
}
