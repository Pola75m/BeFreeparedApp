import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router,RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  get dayOfWeek(): string{
    const weekday = ["swoją niedzielę","swój poniedziałek","swój wtorek","swoją środę","swój czwartek","swój piątek","swoją sobotę"];
    const d = new Date();
    return weekday[d.getDay()];
  }
  
  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

}
