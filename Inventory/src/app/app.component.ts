import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/loginservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './services/session.service';
import * as $ from 'jquery';
import { ToastService } from './services/toast.service';
import { RegisterUserService } from './services/registerUser.service';
import { RegisterUser } from './model/registerUser.modal';
import { countryMasters } from "./model/country.model";
import { stateMaster } from './model/stateMaster.model';
import { categoryMaster } from './model/categoryMaster.model';
interface APIResponse {
  isSuccess: boolean;
  result: RegisterUser; 
  //result: any; 
  message: string[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventory';
  isAuthenticated =false;
  showSidebar=true;
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
  userName:string='';
  logo:string='';
  isDropdownOpen = false;
  constructor(public authService: AuthService,private router:Router,
    private route:ActivatedRoute,
    public sessionService:SessionService,
    private toastService:ToastService,
    private registerUserService:RegisterUserService){}
  togglesideNav(){
    //this.router.navigate(['sidebar'],{relativeTo:this.route});
    if(this.showSidebar==true)
    {
      this.showSidebar=false;      
    }
    else 
    this.showSidebar=true;
  }
  logout(){
    this.authService.setAuthenticated(false);
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {      
      this.isAuthenticated = isAuthenticated;
    });
    this.router.navigate(['login'],{relativeTo:this.route});
  }  
  openDropDown(){
    this.isDropdownOpen = !this.isDropdownOpen;
   
  }
  
  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      
      this.isAuthenticated = isAuthenticated;
    });  
    this.registerUserService.getUser().subscribe({
      next: (response: APIResponse) => {
        if (response.isSuccess) {
          
          this.registerUser=response.result;
          console.log(this.registerUser);
          console.log(this.registerUser.countryMasters.country);
          this.userName=this.registerUser.firstName;
          this.logo=this.userName.charAt(0);
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

