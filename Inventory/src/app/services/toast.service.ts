import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title);
    console.log(message);
  }

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title);
    console.log(message);
  }
}
