import { GetExpensesService } from './get-expenses.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddExpenseComponent } from './add-expense/add-expense.component';

import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ViewAllExpensesComponent } from './view-all-expenses/view-all-expenses.component';
import { LoginService } from './login.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LogoutComponent } from './logout/logout.component';

const appRoutes :Routes = [
  {
    path : 'home',
    component:HomeComponent
  },
  {
    path : 'register',
    component:RegisterComponent
  },
  {
    path: 'logout',
    component:LogoutComponent
  },
  {
    path : 'login',
    component:LoginComponent
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path: 'add-expense',
    component:AddExpenseComponent
  },
  {
    path: 'view-all-expenses',
    component:ViewAllExpensesComponent
  },
  {
    path : '',
    component:LoginComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,

    AddExpenseComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ViewAllExpensesComponent,
    LogoutComponent
   

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,


    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxPaginationModule


  ],
  providers: [ CookieService, 
    {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  },LoginService, GetExpensesService],
  bootstrap: [AppComponent]
})
export class AppModule { }