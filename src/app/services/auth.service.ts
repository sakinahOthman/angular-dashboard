import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api';

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    if (environment.useMockAuth) {
      // Mock authentication for testing — credentials: admin / password
      if (username === 'admin' && password === 'password') {
        const mockToken = 'mock.jwt.token';
        localStorage.setItem('token', mockToken);
        return of({ token: mockToken });
      }
      return throwError(() => new Error('Invalid credentials'));
    }

    return this.http.post<any>(`${this.API_URL}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
