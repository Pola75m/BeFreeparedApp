import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  login = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:3000/register', { login: this.login, password: this.password })
      .subscribe({
        next: (res) => {
          alert('Registered successfully!'),
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 409) {
          alert('User login already exists.');
        } else {
          alert('Registration failed.')
        }}
      });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
