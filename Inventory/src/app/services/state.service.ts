import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SessionService } from './session.service';
import { APIResponse } from '../model/apiResponse.interface';
import { Observable } from 'rxjs';
import { stateMaster } from '../model/stateMaster.model';

@Injectable({
  providedIn: 'root',
})
export class StateService implements OnInit {
  baseApiUrl: string = environment.baseApiUrl;
  private usertoken: string = '';
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.usertoken = sessionService.getToken() || '';
  }
  getAllState(): Observable<APIResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.get<APIResponse<any>>(
      this.baseApiUrl + '/api/StateController/GetAll',
      { headers }
    );
  }
  getActiveState(): Observable<APIResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.get<APIResponse<any>>(
      this.baseApiUrl + '/api/StateController/GetAllState',
      { headers }
    );
  }

  updateState(newState: stateMaster): Observable<APIResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.get<APIResponse<any>>(
      this.baseApiUrl + '/api/StateController/GetAll',
      { headers }
    );
  }
  getStateByCountry(countryId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usertoken}`
    });
  
    const params = new HttpParams().set('countryId', countryId.toString());
  
    return this.http.get<APIResponse<any>>(this.baseApiUrl + '/api/StateController/GetStateForCountry', {
      headers: headers,
      params: params,
    });
  }
  
  
  
  ngOnInit(): void {}
}
