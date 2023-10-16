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

@NgModule({
  declarations: [
    AppComponent,
    CreateRoleComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    RoleMasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    
  ],
  providers: [ApiserviceService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
