import { Component } from '@angular/core';
import { AuthService } from './loginservice.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  username: string = '';
  password: string = '';
  error: string = '';
  isAuthenticated = false; 
  formSubmitted: boolean = false; 
  errorMessage:string='';
  constructor(private authService: AuthService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private sessionService:SessionService,
    private toastService:ToastService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.authService.setAuthenticated(false);
  }
  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName);
    return control && control.hasError(errorName);
  }

  errorMsg(errorMsg:string){
    this.errorMessage=errorMsg;
  }
  onSubmit() {
    this.formSubmitted = true;
    
    if (this.loginForm.valid) {
      this.isAuthenticated = false; 
      this.username = this.loginForm.value.username;
      this.password = this.loginForm.value.password;
      
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          if (response.isSuccess) {
            localStorage.setItem('token', response.token);
            this.authService.setAuthenticated(true);
            this.router.navigate(['dashboard'], { relativeTo: this.route });
            this.sessionService.setToken(response.result.token);
          } else {
              this.error = 'An error occurred during login.';            
          }
        },
        (error) => {
          console.log(error.error.message[0]);
          this.errorMsg(error.error.message[0]);
        }
      );
    }
  }
  
  
}

