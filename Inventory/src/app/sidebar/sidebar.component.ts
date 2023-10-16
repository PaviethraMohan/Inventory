import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { SidebarService } from './sidebarservice.service';
import { MenuMaster } from '../model/menu.model';
import { AuthService } from '../login/loginservice.service';

interface APIResponse {
  isSuccess: boolean;
  result: MenuMaster[]; 
  message: string[];
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  sessionToken:string;
  menus: MenuMaster[] = [];
  showsubMenu:boolean=false;
  isAuthenticated:boolean=true;
constructor(private sessionService:SessionService,private sidebarService:SidebarService,private authService:AuthService){
   this.sessionToken=this.sessionService.getToken();
}
toggleSubMenu(mainmenu:any) {
  this.authService.setAuthenticated(true);
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      
      this.isAuthenticated = isAuthenticated;
    });
    
  this.showsubMenu=true;
}
ngOnInit(): void {
  this.sidebarService.getMenus().subscribe({
    next: (response: APIResponse) => {
      if (response.isSuccess) {
        this.menus = response.result;
        this.menus.forEach(element => {
          if(element.controller=='Role')
          {element.path='/rolemaster';}
        else if(element.controller=='Auth'){
          element.path='/register';
        }
        else if(element.controller=='Country'){
          element.path='/country';
        }else if(element.controller=='State'){
          element.path='/state';
        }else if(element.controller=='RoleMenuMap'){
          element.path='/roleMenuMap';
        }
        });
      } else {
        console.error('API Request failed:', response.message);
      }
    },
    error: (error) => {
      console.error('HTTP Request Error:', error);
    }
  });
}
}
