import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoleComponent } from './role-master/create/create.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = 
[
  {path:'',component:LoginComponent},
  {path:'rolemaster',component:RoleMasterComponent},
  {path:'rolemaster/createRole',component:CreateRoleComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'sidebar',component:SidebarComponent},
  {path:'profile',component:ProfileComponent},
  {path:'user',component:RegisteruserComponent},
  {path:'country',component:CountryComponent},
  {path:'state',component:StateComponent},
  {path:'category',component:CategoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
