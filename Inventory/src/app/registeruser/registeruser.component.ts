import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterUserService } from '../services/registerUser.service';
import { ToastService } from '../services/toast.service';
import { RegisterUser } from '../model/registerUser.modal';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { countryMasters } from '../model/country.model';
import { stateMaster } from '../model/stateMaster.model';
import { categoryMaster } from '../model/categoryMaster.model';
import { categoryService } from '../services/category.service';
import { countryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
// Define the desired date format
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface APIResponse {
  isSuccess: boolean;
  result: RegisterUser[];
  message: string[];
}
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css'],
  providers: [
    // Use the Moment.js date adapter
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    // Define your custom date format
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe, 
  ],
})
export class RegisteruserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  registerUser: RegisterUser[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'country',
    'state',
    'category',
    'actions',
  ];
  pageSize = 5;
  pageIndex = 0;
  dataSource: MatTableDataSource<RegisterUser>;
  currentPageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: this.pageSize,
    length: 0,
  };
  selectedRegisterUser: RegisterUser | null = null;
  registerUserToDelete: number | null = null;
  registerUserToActivate: number | null = null;
  updatedFirstName: string = '';
  updatedLastName: string = '';
  updatedEmail: string = '';
  countryList:countryMasters[]=[];
  stateList:stateMaster[]=[];
  categoryList:categoryMaster[]=[];
  countryMasters: countryMasters = {
    countryId: 0,
    country: '',
    statusFlag: false,
  };
  stateMaster: stateMaster = {
    stateCode: 0,
    state: '',
    statusFlag: false,
    countryId: '',
    country: '',
  };
  categoryMaster: categoryMaster = {
    categoryId: 0,
    categoryName: '',
    statusFlag: false,
  };
  createUserForm: RegisterUser = {
    registerId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    gender: '',
    address: '',
    postalCode: 0,
    countryMasters: this.countryMasters,
    country: 0,
    stateMaster: this.stateMaster,
    state: '',
    category: '',
    categoryMaster: this.categoryMaster,
    dateOfBirth: new Date(),
  };
  
  constructor(
    private registerUserService: RegisterUserService,
    private toastService: ToastService,
    private countryService: countryService,
    private categoryService: categoryService,
    private stateService: StateService,
    private datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<RegisterUser>(this.registerUser);
  }
  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.currentPageEvent = event;
  }
  openCreateUserModal() {

    this.categoryService.getActiveCategory().subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.categoryList = response.result;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });
    this.countryService.getActiveCountry().subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.countryList = response.result;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });    
    
    this.createUserForm.category = '';
    this.createUserForm.country = 0;
    this.createUserForm.state = '';

    $('#createUserModal').modal('show');
  }
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    // When the date changes, it will be automatically updated in createUserForm.dateOfBirth
    // You can add any additional logic here if needed.
    this.createUserForm.dateOfBirth = event.value || new Date();
}
errorMessage: string | null = null;

onPhoneNumberInput(event: InputEvent) {
  const inputElement = event.target as HTMLInputElement;
  const phoneNumber = inputElement.value;
  if (/[^0-9]/.test(phoneNumber)) {
    this.errorMessage = 'Please enter a valid Indian phone number (only digits).';
    inputElement.setCustomValidity(this.errorMessage);
  } else {
    this.errorMessage = null;
    inputElement.setCustomValidity('');
  }
}
onPostalCodeInput(event: InputEvent) {
  const inputElement = event.target as HTMLInputElement;
  const postalCode = inputElement.value;
  if (!/^[1-9]\d{5}$/.test(postalCode)) {
    this.errorMessage = 'Please enter a valid 6-digit postal code that does not start with 0 (only digits).';
    inputElement.setCustomValidity(this.errorMessage);
  } else {
    this.errorMessage = null;
    inputElement.setCustomValidity('');
  }
}


  onCountryChange(selectedCountryId: number){
    console.log(selectedCountryId);
    this.stateService.getStateByCountry(selectedCountryId).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.stateList = response.result;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      }
    });

  }
  openUpdateUserModal(update: RegisterUser) {
    this.selectedRegisterUser = update;
    $('#updateModal').modal('show');
  }
  closeUpdateModal() {
    $('#updateModal').modal('hide');
  }
  openDeleteConfirmation(registerId: number) {
    this.registerUserToDelete = registerId;
    console.log(registerId);
    $('#confirmationModal').modal('show');
  }

  openActivateConfirmation(registerId: number) {
    this.registerUserToActivate = registerId;
    $('#activationModal').modal('show');
  }
  deleteConfirmedUser() {
    if (this.registerUserToDelete !== null) {
      this.registerUserService.deleteUser(this.registerUserToDelete).subscribe({
        next: () => {
          this.toastService.showSuccess('Role deleted successfully');
          console.log('Deleted successfully');
          this.registerUserService.getAllUsers().subscribe({
            next: (response: APIResponse) => {
              if (response.isSuccess) {
                this.registerUser = response.result;
                this.dataSource = new MatTableDataSource(this.registerUser);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.paginator.page.next(this.currentPageEvent);
              } else {
                console.log(response.message);
              }
            },
            error: (error) => {
              this.toastService.showError(error.error.message[0]);
            },
          });

          this.registerUserToDelete = null;
          $('#confirmationModal').modal('hide');
        },
        error: (error) => {
          this.toastService.showError(error.error.message[0]);
        },
      });
    }
  }
  onCancel() {
    $('#createUserModal').modal('hide');
    $('#activationModal').modal('hide');
    $('#confirmationModal').modal('hide');
    // if ($('#userDetailsModal').data('bs.modal').isShown) {
    //   $('#userDetailsModal').modal('hide');
    // }
    $('#userDetailsModal').modal('hide');
  }
  activateConfirmedUser() {
    if (this.registerUserToActivate !== null) {
      this.registerUserService
        .activateUser(this.registerUserToActivate)
        .subscribe({
          next: () => {
            this.toastService.showSuccess('Coutry activated successfully');
            this.registerUserService.getAllUsers().subscribe({
              next: (response: APIResponse) => {
                if (response.isSuccess) {
                  this.registerUser = response.result;
                  this.dataSource = new MatTableDataSource(this.registerUser);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.paginator.page.next(this.currentPageEvent);
                } else {
                  console.log(response.message);
                }
              },
              error: (error) => {
                this.toastService.showError(error.error.message[0]);
              },
            });
            this.registerUserToActivate = null;
            $('#activationModal').modal('hide');
          },
          error: (error) => {
            this.toastService.showError(error.error.message[0]);
          },
        });
    }
  }
  edit() {}
  updateUser() {}
  closeCreateUserModal() {}
  createUser() {
    const { firstName, lastName, email } = this.createUserForm;
  }
  openUserDetailsModal(user: RegisterUser) {
    this.selectedRegisterUser = user;
    $('#userDetailsModal').modal('show');
  }
  ngOnInit(): void {
    this.registerUserService.getAllUsers().subscribe({
      next: (response: APIResponse) => {
        if (response.isSuccess) {
          this.registerUser = response.result;
          this.dataSource = new MatTableDataSource<RegisterUser>(
            this.registerUser
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.registerUser);
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message[0]);
      },
    });
  }
}
