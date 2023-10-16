import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoleMaster } from 'src/app/model/rolemaster.model';
import { Router } from '@angular/router'; 
import { RolemasterService } from 'src/app/services/rolemaster.service';
//import * as $ from 'jquery';
import 'bootstrap'; 
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
 
 constructor(private roleService:RolemasterService,private router: Router){
  $('#createRoleModal').modal('hide');
  this.onModalClose.emit();
 }
 openModal() {
  $('#createRoleModal').modal('show'); 
}

closeModal() {
  $('#createRoleModal').modal('hide'); // Use jQuery to close the modal
  this.onModalClose.emit();
}
  ngOnInit(): void {}
  save() {
    // Call the service to send the roleName to the ASP.NET API
    this.roleService.createRole(this.addroleName)
      .subscribe({
        next:(addroleName)=>{
          $('#createRoleModal').modal('hide'); // Use jQuery to close the modal
          this.onModalClose.emit();
          this.router.navigate(['rolemaster']);
        },
        error: (error) => {
          console.error('HTTP Request Error:', error);
        }
      }
      );
  }
  ngAfterViewInit(): void {
    $(document).ready(() => {
      this.openModal();
    });
  }
  cancel() {
    $('#createRoleModal').modal('hide'); // Use jQuery to close the modal
  this.onModalClose.emit();
  }
  

}
