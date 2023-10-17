import { Component } from '@angular/core';
import { AuthService } from './loginservice.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

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
  constructor(private authService: AuthService,private fb:FormBuilder,private router:Router,
    private route:ActivatedRoute,private sessionService:SessionService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName);
    return control && control.hasError(errorName);
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
            this.router.navigate(['dashboard'],{relativeTo:this.route});
            this.sessionService.setToken(response.result.token);
          } else {
            this.error = 'Invalid username or password';
          }
        },
        (error) => {
          this.error = 'An error occurred during login.';
        }
      );
    }
  }
  
  
}

