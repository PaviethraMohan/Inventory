import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { APIResponse } from '../model/apiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    
  private usertoken: string = '';
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  setToken(token: string) {
    this.usertoken = token;
    return this.usertoken;
  }
  getToken(): string {
    console.log(this.usertoken);
    return this.usertoken;
    
  }
}
