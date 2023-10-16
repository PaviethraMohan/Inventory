import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl: string = environment.baseApiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  setAuthenticated(isAuthenticated: boolean) {
    console.log(isAuthenticated);
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const model = { username, password };
    return this.http.post(this.loginUrl+'/api/UsersController/LoginUser', model);
  }
}
