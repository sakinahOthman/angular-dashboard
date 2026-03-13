import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {

    // Mock authentication
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      localStorage.setItem('auth', 'true');
      return true;
    }

    return false;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}