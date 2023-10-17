import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { APIResponse } from '../model/apiResponse.interface';
import { RoleMaster } from '../model/rolemaster.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RolemasterService {

  baseApiUrl: string = environment.baseApiUrl;
  private usertoken: string = '';
  constructor(private http: HttpClient,private sessionService:SessionService) { 
    this.usertoken=sessionService.getToken()|| '';
  }

  getAllRoles(): Observable<APIResponse<any>> {
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usertoken}`
    });
    return this.http.get<APIResponse<any>>(this.baseApiUrl + '/api/RoleMasterController/GetAll',{headers});
  }
  createRole(newRole:RoleMaster) {
    let data:RoleMaster=newRole;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usertoken}`
    });
    return this.http.post(this.baseApiUrl+'/api/RoleMasterController/CreateRole', data,{headers}); 
  }
  updateRole(newRole:RoleMaster){
    let data:RoleMaster=newRole;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usertoken}`
    });
    return this.http.put(this.baseApiUrl+'/api/RoleMasterController/RoleUpdate', data,{headers}); 
  }
  deleteRole(roleId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usertoken}`
    });
  
    return this.http.request('delete', this.baseApiUrl + '/api/RoleMasterController/DeleteRole', {
      body: roleId,
      headers: headers,
    });
  }
  activateRole(roleId: number) {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usertoken}`
    });
  
    return this.http.request('put', this.baseApiUrl + '/api/RoleMasterController/RoleUpdateStatus', {
      body: roleId,
      headers: headers,
    });
  }
}
