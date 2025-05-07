import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editing',
  imports: [CommonModule, FormsModule],
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent {
  newLogin: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loginTaken: boolean = false;
  passwordMismatch: boolean = false;
  theme: string = 'light';

  constructor(private http: HttpClient, private router: Router) {}
  //zmiana danych profilu
  updateProfile() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user?.Uid;
    this.loginTaken = false;
    this.passwordMismatch = false;
    //sprawdzanie hasła
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    // sprawdzanie dostępności loginu
    if (this.newLogin) {
      this.http.get<any[]>(`http://localhost:3000/users?login=${this.newLogin}`).subscribe(users => {
        if (users.length > 0 && users[0].Uid !== userId) {
          this.loginTaken = true;
        } else {
          this.saveChanges(userId);
        }
      });
    } else {
      this.saveChanges(userId);
    }
  }
  //zapisywanie zmian
  saveChanges(userId: number) {
    const updateData: any = {};
    if (this.newLogin) updateData.login = this.newLogin;
    if (this.newPassword) updateData.password = this.newPassword;

    this.http.put(`http://localhost:3000/users/${userId}`, updateData).subscribe(() => {
      alert('Zapisano zmiany!');
      if (this.newLogin) {
        const user = JSON.parse(localStorage.getItem('user')!);
        user.login = this.newLogin;
        localStorage.setItem('user', JSON.stringify(user));
      }
    });
  }
  //usuwanie konta
  deleteAccount() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.Uid;
  
    if (!userId) {
      alert('Nie zalogowano.');
      return;
    }
  
    if (!confirm('Czy na pewno chcesz usunąć konto? Nie odwrócisz tego :c')) {
      return;
    }
  
    this.http.delete(`http://localhost:3000/users/${userId}`).subscribe(() => {
      alert('Usunięto konto.');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }, err => {
      console.error(err);
      alert('Wystąpił bład w usuwaniu konta.');
    });
  }
  //mode
  toggleTheme() {
    document.body.className = this.theme;
  }
}
