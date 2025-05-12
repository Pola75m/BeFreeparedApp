import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  unsubscribe$: Subject<boolean> = new Subject();
  username: string = '';
  menuOpen = false;
  constructor(private router: Router, private userService: UserService) {}
  
  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit(): void {
    this.userService.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe(user =>{
      //if aby nie wyrzucało error: user is null
      if(user!== null)
      this.username = user.login;
    });
    this.router.events.subscribe(() => {
    this.menuOpen = false;
    })}
//https://stackoverflow.com/questions/57355066/how-to-implement-behavior-subject-using-service-in-angular-8
ngOnDestroy() {
  this.unsubscribe$.next(true);
  this.unsubscribe$.complete();
}
//sprawdzanie zalogowania
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
//przycisk wylogowania
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);    
  }
}
