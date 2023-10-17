import { Component, OnInit, ViewChild } from '@angular/core';
import { RolemasterService } from '../services/rolemaster.service';
import { RoleMaster } from '../model/rolemaster.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';


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
  pageSize = 5; 
  pageIndex = 0;
  roleToDelete: number | null = null; 
  roleToActivate: number | null = null;
  updatedRoleName: string | null = null;

 // @ViewChild('confirmationDialog') confirmationDialog: ConfirmationDialogComponent | undefined;
 dataSource: MatTableDataSource<RoleMaster> = new MatTableDataSource<RoleMaster>([]);
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 displayedColumns: string[] = ['roleName', 'actions'];
  constructor(
    private rolemasterService: RolemasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  currentPageEvent: PageEvent = { pageIndex: 0, pageSize: this.pageSize, length: 0 };

  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.currentPageEvent = event; 
  }

  openCreateRoleModal() 
  {
    this.showCreateRoleModal = true;
  }

  closeCreateRoleModal()
  {
    this.showCreateRoleModal = false;
  }
  selectedRole: RoleMaster | null = null;


  openUpdateRoleModal(role: RoleMaster) {
    this.selectedRole = role;
    this.updatedRoleName = role.roleName; 
    $('#updateRoleModal').modal('show');
  }
  
  updateRole() {
    if (this.selectedRole && this.updatedRoleName !== null) {
    this.selectedRole.roleName = this.updatedRoleName;
    this.rolemasterService.updateRole(this.selectedRole).subscribe({
      next: () => {
        console.log('Role updated successfully');
        $('#updateRoleModal').modal('hide');
      },
      error: (error) => {
        console.error('HTTP Request Error:', error);
      }
    });
    this.updatedRoleName = null; 
    }
  }
  closeUpdateRoleModal() {
    $('#updateRoleModal').modal('hide');
  }
  openDeleteConfirmation(roleId: number) {
    this.roleToDelete = roleId;
    $('#confirmationModal').modal('show'); // Show the confirmation modal
  }
  openActivateConfirmation(roleId:number){
    this.roleToActivate =roleId;
    $('#activationModal').modal('show');

  }
  deleteConfirmedRole() {
    if (this.roleToDelete !== null) {
      // Call the service to delete the role
      this.rolemasterService.deleteRole(this.roleToDelete).subscribe({
        next: () => {
          console.log('Deleted successfully');
          this.rolemasterService.getAllRoles().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.rolemaster = response.result;
                this.dataSource = new MatTableDataSource(this.rolemaster);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
              }
            },
            error: (error) => {
              console.error('HTTP Request Error:', error);
            }
            
          });

          this.roleToDelete = null;
          $('#confirmationModal').modal('hide');
        },
        error: (error) => {
          console.error('HTTP Request Error:', error);
        }
      });
    }
  }

  activateConfirmedRole() {
    if (this.roleToActivate !== null) {
      this.rolemasterService.activateRole(this.roleToActivate).subscribe({
        next: () => {
          console.log('Activated successfully');
          this.rolemasterService.getAllRoles().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.rolemaster = response.result;
                this.dataSource = new MatTableDataSource(this.rolemaster);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
              }
            },
            error: (error) => {
              console.error('HTTP Request Error:', error);
            }
            
          });
          

          this.roleToActivate = null;
          $('#activationModal').modal('hide');
        },
        error: (error) => {
          console.error('HTTP Request Error:', error);
        }
      });
    }
  }
  onCancel(){
    $('#activationModal').modal('hide');
    $('#confirmationModal').modal('hide');
    this.router.navigate(['./'],{relativeTo:this.route})
  }

  ngOnInit(): void {
    this.rolemasterService.getAllRoles().subscribe({
      next: (response: APIResponse) => {
        if (response.isSuccess) {
          this.rolemaster = response.result;
          this.dataSource = new MatTableDataSource(this.rolemaster);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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

