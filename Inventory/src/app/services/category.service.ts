import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/apiResponse.interface';
import { categoryMaster } from '../model/categoryMaster.model';

@Injectable({
  providedIn: 'root',
})
export class categoryService implements OnInit {
  baseApiUrl: string = environment.baseApiUrl;
  private usertoken: string = '';
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.usertoken = sessionService.getToken() || '';
  }
  ngOnInit(): void {}
  getAllCategory(): Observable<APIResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.get<APIResponse<any>>(
      this.baseApiUrl + '/api/CategoryMasterController/GetAll',
      { headers }
    );
  }
  getActiveCategory(): Observable<APIResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.get<APIResponse<any>>(
      this.baseApiUrl + '/api/CategoryMasterController/GetAllCategory',
      { headers }
    );
  }
  updateCategory(newCategory: categoryMaster) {
    let data: categoryMaster = newCategory;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.put(
      this.baseApiUrl + '/api/CategoryMasterController/CategoryUpdate',
      data,
      { headers }
    );
  }
  deleteCategory(categoryId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });

    return this.http.request(
      'delete',
      this.baseApiUrl + '/api/CategoryMasterController/DeleteCategory',
      {
        body: categoryId,
        headers: headers,
      }
    );
  }
  activateCategory(categoryId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });

    return this.http.request(
      'put',
      this.baseApiUrl + '/api/CategoryMasterController/CategoryUpdateStatus',
      {
        body: categoryId,
        headers: headers,
      }
    );
  }
  createCategory(newCategory: categoryMaster) {
    let data: categoryMaster = newCategory;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usertoken}`,
    });
    return this.http.post(
      this.baseApiUrl + '/api/CategoryMasterController/CreateCategory',
      data,
      { headers }
    );
  }
}
