import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../services/state.service';
import { ToastService } from '../services/toast.service';
import { stateMaster } from '../model/stateMaster.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { countryMasters } from '../model/country.model';
import { countryService } from '../services/country.service';

interface APIResponse {
  isSuccess: boolean;
  result: stateMaster[];   
  message: string[];
}
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  state:stateMaster[]=[];
  pageSize = 5; 
  pageIndex = 0;
  dataSource: MatTableDataSource<stateMaster>;
  updatedState: string | null = null;
  newState: string | null = null;
  selectedState: stateMaster | null = null;
  selectedCountryId:number|null =null;
  country:countryMasters[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['state','country', 'actions'];
  currentPageEvent: PageEvent = { pageIndex: 0, pageSize: this.pageSize, length: 0 };

  constructor(private stateService:StateService,
    private toastService:ToastService,
    private countryService:countryService){
    this.dataSource = new MatTableDataSource<stateMaster>(this.state);
  }
  openUpdateStateModal(state: stateMaster) {
    this.selectedState = state;
    this.updatedState = state.state; 
    $('#updateRoleModal').modal('show');
  }
  updateCountry() {
    if (this.selectedState && this.updatedState !== null) {
    this.selectedState.state = this.updatedState;
    this.stateService.updateState(this.selectedState).subscribe({
      next: () => {
        this.toastService.showSuccess('Role updated successfully');
        $('#updateRoleModal').modal('hide');       
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });
    this.updatedState = null; 
    }  
  }
  closeUpdateRoleModal() {
    $('#updateRoleModal').modal('hide');
  }
  openDeleteConfirmation(state: stateMaster) {}
  openActivateConfirmation(state: stateMaster) {}
  createState(){
    this.countryService.getAllCountry().subscribe({
      next: (response:any) => {
        if (response.isSuccess) {
          this.country = response.result;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });
  
    this.selectedCountryId = null;
    $('#createStateModal').modal('show');
  }
  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.currentPageEvent = event; 
  }

  createNewState(){}
  ngOnInit(): void {
    this.stateService.getAllState().subscribe({
      next: (response: APIResponse) => {
        if (response.isSuccess) {
          this.state = response.result;
          this.dataSource = new MatTableDataSource<stateMaster>(this.state);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.state);
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });
  }

}
