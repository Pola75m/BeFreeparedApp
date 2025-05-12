import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
//BehaviorSubject - zamienia initial value na subscribed 
  private user$: BehaviorSubject<any> = new BehaviorSubject(null); 

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user$.next(JSON.parse(savedUser)); //
    }
  }

  getUser(): Observable<any>{
    return this.user$.asObservable();
  }
  setUser(user: any) {
    this.user$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    this.user$.next(null);
    localStorage.removeItem('user');
  }

}
