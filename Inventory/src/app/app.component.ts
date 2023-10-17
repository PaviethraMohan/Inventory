import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/loginservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventory';
  isAuthenticated =false;
  constructor(public authService: AuthService,private router:Router,
    private route:ActivatedRoute,public sessionService:SessionService){

  }
  togglesideNav(){
    this.router.navigate(['sidebar'],{relativeTo:this.route});
  }
  logout(){
    console.log("logout");
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
