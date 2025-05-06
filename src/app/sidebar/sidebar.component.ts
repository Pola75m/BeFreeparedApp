import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}
  
//sprawdzanie zalogowania
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
//przycisk wylogowania
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });    
  }
}