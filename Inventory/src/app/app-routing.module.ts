import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoleComponent } from './role-master/create/create.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RoleMasterComponent } from './role-master/role-master.component';

const routes: Routes = 
[
  {path:'',component:RoleMasterComponent},
  {path:'rolemaster',component:RoleMasterComponent},
  {path:'rolemaster/createRole',component:CreateRoleComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'sidebar',component:SidebarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
