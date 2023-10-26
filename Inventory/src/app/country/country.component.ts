import { Component, OnInit, ViewChild } from '@angular/core';
import { countryService } from '../services/country.service';
import { ToastService } from '../services/toast.service';
import { countryMasters } from '../model/country.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

interface APIResponse {
  isSuccess: boolean;
  result: countryMasters[]; 
  message: string[];
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  country: countryMasters[] = [];
  pageSize = 5; 
  pageIndex = 0;
  dataSource: MatTableDataSource<countryMasters>;
  updatedCountry: string | null = null;
  selectedCountry: countryMasters | null = null;
  countryToDelete: number | null = null; 
  countryToActivate: number | null = null;
  addCountryName:countryMasters={
    countryId:0,
    country:'',
    statusFlag:false
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['country', 'actions'];
  currentPageEvent: PageEvent = { pageIndex: 0, pageSize: this.pageSize, length: 0 };

  constructor(private countryService: countryService,
    private router: Router,
    private route: ActivatedRoute,
     private toastService: ToastService) {
    this.dataSource = new MatTableDataSource<countryMasters>(this.country);
  }
  openUpdateCountryModal(country: countryMasters) {
    this.selectedCountry = country;
    this.updatedCountry = country.country; 
    $('#updateModal').modal('show');
  }
  updateCountry() {
    if (this.selectedCountry && this.updatedCountry !== null) {
    this.selectedCountry.country = this.updatedCountry;
    this.countryService.updateCountry(this.selectedCountry).subscribe({
      next: () => {
        this.toastService.showSuccess('Country updated successfully');
        $('#updateModal').modal('hide');       
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });
    this.updatedCountry = null; 
    }
  }
  closeUpdateModal() {
    $('#updateModal').modal('hide');
  }
  openDeleteConfirmation(country: number) {
    this.countryToDelete = country;
    $('#confirmationModal').modal('show'); 
  }
  openActivateConfirmation(country: number) {
    this.countryToActivate =country;
    $('#activationModal').modal('show');
  }

  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.currentPageEvent = event; 
  }
  deleteConfirmedCountry(){
    if (this.countryToDelete !== null) {
      // Call the service to delete the role
      this.countryService.deleteCountry(this.countryToDelete).subscribe({
        next: () => {
          this.toastService.showSuccess('Role deleted successfully');
          console.log('Deleted successfully');
          this.countryService.getAllCountry().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.country = response.result;
                this.dataSource = new MatTableDataSource(this.country);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
                
              }
            },
            error: (error) => {
              this.toastService.showError(error.error.message[0]);
            }
            
          });

          this.countryToDelete = null;
          $('#confirmationModal').modal('hide');
        },
        error: (error) => {
          this.toastService.showError(error.error.message[0]);
        }
      });
    }
  }
  activateConfirmedCountry(){
    if (this.countryToActivate !== null) {
      this.countryService.activateCountry(this.countryToActivate).subscribe({
        next: () => {
          this.toastService.showSuccess('Coutry activated successfully');
          this.countryService.getAllCountry().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.country = response.result;
                this.dataSource = new MatTableDataSource(this.country);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
              }
            },
            error: (error) => {
              this.toastService.showError(error.error.message[0]);
            }            
          });
          this.countryToActivate = null;
          $('#activationModal').modal('hide');
        },
        error: (error) => {
          this.toastService.showError(error.error.message[0]);
        }
      });
    }
  }
  createCountry() {
    this.countryService.createCountry(this.addCountryName) // Assuming you have a model for adding a new country similar to addroleName
      .subscribe({
        next: (createdCountry) => {
          this.toastService.showSuccess('Country added successfully');
          this.closeCreateCountryModal(); // Close the create modal
          this.countryService.getAllCountry().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.country = response.result;
                this.dataSource = new MatTableDataSource<countryMasters>(this.country);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
              }
            },
            error: (error) => {
              this.toastService.showError(error.error.message[0]);
            }
          });
        },
        error: (error) => {
          this.toastService.showError(error.error.message[0]);
        }
      });
  }
  openCreateCountryModal(){
    $('#createCountryModal').modal('show');
  }
  closeCreateCountryModal() {
    // Close the create country modal here
    $('#createCountryModal').modal('hide');
  }
  
  onCancel(){
    $('#activationModal').modal('hide');
    $('#confirmationModal').modal('hide');
    this.router.navigate(['./'],{relativeTo:this.route})

  }
  ngOnInit(): void {
    this.countryService.getAllCountry().subscribe({
      next: (response: APIResponse) => {
        if (response.isSuccess) {
          this.country = response.result;
          this.dataSource = new MatTableDataSource<countryMasters>(this.country);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
