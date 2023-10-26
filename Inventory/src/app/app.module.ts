import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from './apiservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRoleComponent } from './role-master/create/create.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SessionService } from './services/session.service';
import { RoleMasterComponent } from './role-master/role-master.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CategoryComponent } from './category/category.component';
import { LoginaccessComponent } from './loginaccess/loginaccess.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { EditComponent } from './registeruser/edit/edit.component';
import { MatInputModule } from '@angular/material/input';   
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
@NgModule({
  declarations: [
    AppComponent,
    CreateRoleComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    RoleMasterComponent,
    ProfileComponent,
    CountryComponent,
    StateComponent,
    CategoryComponent,
    LoginaccessComponent,
    RegisteruserComponent,
    EditComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, 
      positionClass: 'toast-top-right', 
      preventDuplicates: true, 
      closeButton: true, 
    }),
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MomentDateModule
    
  ],
  providers: [ApiserviceService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
