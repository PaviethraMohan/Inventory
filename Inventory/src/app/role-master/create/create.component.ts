import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoleMaster } from 'src/app/model/rolemaster.model';
import { Router } from '@angular/router'; 
import { RolemasterService } from 'src/app/services/rolemaster.service';
//import * as $ from 'jquery';
import 'bootstrap'; 
import { ToastService } from 'src/app/services/toast.service';
declare var $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateRoleComponent implements OnInit{
  @Output() onModalClose:EventEmitter<void>=new EventEmitter<void>();
 addroleName:RoleMaster={
  roleId:0,
  roleName:'',
  statusFlag:false,
  
 };
 
 constructor(private roleService:RolemasterService,
  private router: Router,
  private toastService: ToastService){
  $('#createRoleModal').modal('hide');
  this.onModalClose.emit();
 }


 openModal() {
  $('#createRoleModal').modal('show'); 
}

closeModal() {
  $('#createRoleModal').modal('hide'); 
  this.onModalClose.emit();
}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    $(document).ready(() => {
      this.openModal();
    });
  }
  save() {
    this.roleService.createRole(this.addroleName)
      .subscribe({
        next:(addroleName)=>{
          this.toastService.showSuccess('Role added successfully');
         $('#createRoleModal').modal('hide'); 
          this.router.navigate(['rolemaster']);
        },
        error: (error) => {
          this.toastService.showError(error.error.message[0]);
          
        }
      }
      );
  }
  
  cancel() {
    $('#createRoleModal').modal('hide'); 
  this.onModalClose.emit();
  }
  

}
