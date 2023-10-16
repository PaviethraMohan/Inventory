import { Component, OnInit, ViewChild } from '@angular/core';
import { RolemasterService } from '../services/rolemaster.service';
import { RoleMaster } from '../model/rolemaster.model';
import { ActivatedRoute, Router } from '@angular/router';

interface APIResponse {
  isSuccess: boolean;
  result: RoleMaster[]; // Assuming RoleMaster is the correct type for your API response
  message: string[];
}

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})

export class RoleMasterComponent implements OnInit {
  rolemaster: RoleMaster[] = [];
  showCreateRoleModal = false;
 // @ViewChild('confirmationDialog') confirmationDialog: ConfirmationDialogComponent | undefined;

  constructor(
    private rolemasterService: RolemasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  openCreateRoleModal() {
    this.showCreateRoleModal = true;
  }

  closeCreateRoleModal() {
    this.showCreateRoleModal = false;
  }
  update(upateRole:RoleMaster){

  }
  // delete(roleId: number) {
  //   console.log(this.confirmationDialog);
  //   if (this.confirmationDialog) {
  //     this.confirmationDialog.message = 'Do you really want to delete this role?';
  //     this.confirmationDialog.confirmed.subscribe(confirmed => {
  //       if (confirmed) {
  //         this.rolemasterService.deleteRole(roleId);
  //       }
  //     });
  //   }
  // }
  
  delete(roleId:number){
    this.rolemasterService.deleteRole(roleId).subscribe({
      next: () => {        
          console.log("deleted successfully");   
          this.router.navigate(['rolemaster']);     
      },
      error: (error) => {
        console.error('HTTP Request Error:', error);
      }
    });
  }
  activate(roleId:number){
    this.rolemasterService.activateRole(roleId).subscribe({
      next: () => {        
          console.log("activated successfully");   
          this.router.navigate(['rolemaster']);     
      },
      error: (error) => {
        console.error('HTTP Request Error:', error);
      }
    });
  }

  ngOnInit(): void {
    this.rolemasterService.getAllRoles().subscribe({
      next: (response: APIResponse) => {
        if (response.isSuccess) {
          this.rolemaster = response.result;
          console.log(response.result);
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('HTTP Request Error:', error);
      }
    });
  }
}

