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
  selectedMainMenuItem: MenuMaster | null = null;

  sessionToken:string;
  menus: MenuMaster[] = [];
  showsubMenu:boolean=false;
  isAuthenticated:boolean=true;
  submenus:MenuMaster[]=[];
constructor(private sessionService:SessionService,private sidebarService:SidebarService,private authService:AuthService){
   this.sessionToken=this.sessionService.getToken()|| '';
}
toggleSubMenu(mainmenu:any) {
  this.submenus=[];
  if(this.showsubMenu==true)
  {
    this.showsubMenu=false;

  }
  else{
  
 this.selectedMainMenuItem = mainmenu;
  this.authService.setAuthenticated(true);
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      
      this.isAuthenticated = isAuthenticated;
    });
    this.menus.forEach(element => {
      if(element.parentMenuId==mainmenu.menuId)
      {
        this.submenus.push(element);

      }
     
    });
    if(this.submenus.length>0 && this.showsubMenu==false)
    {
      this.showsubMenu=true;
    }
    else
    {
      this.showsubMenu=false;
    }
  }   
  
}
sidebarExpanded: boolean = true;

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
hasSubmenus(menuId:number){
  return this.menus.some((submenu) => submenu.parentMenuId === menuId);
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
        else if(element.controller=='Register'){
          element.path='/user';
          console.log(element.controller);
        }
        else if(element.controller=='dashboard'){
          element.path='/dashboard';
        }
        
        else if(element.controller=='Category'){
          element.path='/category';
        }
        else{
          element.path='/invalid';
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
