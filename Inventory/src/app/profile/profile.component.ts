import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from '../services/registerUser.service';
import { RegisterUser } from '../model/registerUser.modal';
import { ToastService } from '../services/toast.service';
import { countryMasters } from '../model/country.model';
import { stateMaster } from '../model/stateMaster.model';
import { categoryMaster } from '../model/categoryMaster.model';
interface APIResponse {
  isSuccess: boolean;
  result: RegisterUser; 
  message: string[];
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  
  countryMasters:countryMasters={
    countryId:0,
    country:'',
    statusFlag:false
  };
  stateMaster:stateMaster={
    stateCode:0,
    state:'',
    statusFlag:false,
    countryId:'',
    country:''
  };
  categoryMaster:categoryMaster={
    categoryId:0,
    categoryName:'',
    statusFlag:false
  };
  
  registerUser:RegisterUser={
    registerId:0,
    firstName:'',
    lastName:'',
    email:'',
    phoneNo:'',
    gender:'',    
    address:'',
    postalCode:0,
    countryMasters:this.countryMasters,
    country:0,
    stateMaster:this.stateMaster,
    state:'',
    category:'',
    categoryMaster:this.categoryMaster,
    dateOfBirth:new Date(),
  };
  editModal=false;
  constructor(private registerUserService:RegisterUserService,private toastService:ToastService){}
  edit(){    
    this.editModal=!this.editModal;
  }
  ngOnInit(): void {
    this.registerUserService.getUser().subscribe({
      next: (response: APIResponse) => {
        if (response.isSuccess) {
          
          this.registerUser=response.result;
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
