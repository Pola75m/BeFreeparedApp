import {Component, OnInit} from '@angular/core';
import { DateTime, Info } from 'luxon';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from "../calendar/calendar.component";
import { TaskService, Task } from '../task.service';


@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  templateUrl: './calendar-page.component.html'
})
export class CalendarPageComponent {
  allMeetings: { [date: string]: string[] } = {};
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      const result: { [date: string]: string[] } = {};

      for (const task of tasks) {
        if (!task.deadline) continue;
        const date = DateTime.fromISO(task.deadline).toISODate()!;
        if (!result[date]) result[date] = [];
        result[date].push(task.task_name + ` (${task.username})`);
      }

      this.allMeetings = result;
    });
  }
}