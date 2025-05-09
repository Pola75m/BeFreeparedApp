//plik do sprawdzania userów
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('user');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
