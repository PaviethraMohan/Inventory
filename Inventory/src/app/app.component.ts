import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/loginservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './services/session.service';
import * as $ from 'jquery';
import { ToastService } from './services/toast.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventory';
  isAuthenticated =false;
  showSidebar=true;
  constructor(public authService: AuthService,private router:Router,
    private route:ActivatedRoute,public sessionService:SessionService,private toastService:ToastService){}
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
  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      
      this.isAuthenticated = isAuthenticated;
    });    
  }  
}
