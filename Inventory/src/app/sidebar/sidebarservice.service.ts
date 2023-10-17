import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { APIResponse } from '../model/apiResponse.interface';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
    
  private usertoken: string = '';
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient,private sessionService:SessionService) { 
    this.usertoken=sessionService.getToken()|| '';
  }
  
  getMenus(){
    
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usertoken}`
      });
      return this.http.get<APIResponse<any>>(this.baseApiUrl + '/api/RoleMenuController/GetMenusForRole',{headers});
}
}

