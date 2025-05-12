import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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
  //rejestrowanie, sprawdzanie czy login wolny
  register(form:NgForm) {
    if(!form.valid){
      return alert('Musisz wpisać login i hasło');
    }
    this.http.post('http://localhost:3000/register', { login: this.login, password: this.password })
      .subscribe({
        next: (res) => {
          alert('Zarejestrowano'),
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 409) {
          alert('Login już istnieje');
        } else {
          alert('Nie udało się zarejestrować')
        }}       
      });
  }
  //przeniesienie na strone logowania
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
