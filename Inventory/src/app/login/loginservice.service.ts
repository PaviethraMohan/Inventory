import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SessionService } from '../services/session.service';

interface UserResponse {
  isSuccess: boolean;
  message: string[];
  result: UserDetails; // Assuming UserDetails is another interface or type that matches the structure of the 'list' object
}

interface UserDetails {
  createdBy: number;
  createdOn: string;
  loginUserId: number;
  registerUsers:RegisterUser;
}
interface RegisterUser {
  firstName:string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl: string = environment.baseApiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.sessionService.getToken() !== null);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private usertoken: string = '';

  setAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  constructor(private http: HttpClient,private sessionService:SessionService) {
    this.usertoken=sessionService.getToken()|| '';
  }

  login(username: string, password: string): Observable<any> {
    const model = { username, password };
    return this.http.post(this.loginUrl+'/api/UsersController/LoginUser', model);
  }

  getUserDetails(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usertoken}`
    });
    return this.http.get<UserResponse>(this.loginUrl + '/api/UsersController/GetUser', { headers });
  }
  
}
