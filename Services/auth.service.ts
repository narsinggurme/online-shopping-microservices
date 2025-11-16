import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private users = [
    { username: 'user', password: '1234' }
  ];

  register(user: any) {
    this.users.push(user);
    return true;
  }

  login(username: string, password: string) {
    const valid = this.users.some(u => u.username === username && u.password === password);
    if (valid) {
      console.log("value stored in session");
      localStorage.setItem('isLoggedIn', 'true');
    }
    return valid;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
