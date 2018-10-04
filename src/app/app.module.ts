import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetExpensesService } from './get-expenses.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { RouterModule,Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ViewAllExpensesComponent } from './view-all-expenses/view-all-expenses.component';
import { LoginService } from './login.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LogoutComponent } from './logout/logout.component';
import { MailSummaryComponent } from './mail-summary/mail-summary.component';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { NgxPopper } from 'angular-popper';
import { ContactComponent } from './contact/contact.component';
import { ChartsModule } from 'ng4-charts';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { AmountValidatorDirective } from './add-expense/amount-validator.directive';
import { ConfirmEqualPasswordDirective} from './update-password/confirm-equal-password.directive';

const appRoutes : Routes = [
  {
    path : 'home',
    component:HomeComponent
  },
  {
    path : 'contact',
    component:ContactComponent
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
    path: 'update-password',
    component:UpdatePasswordComponent
  },
  {
    path: 'update-userInfo',
    component:UpdateUserInfoComponent
  },
  {
    path: 'monthly-report',
    component:MonthlyReportComponent
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path: 'mailSummary',
    component:MailSummaryComponent
  },
  {
    path: 'view-all-expenses',
    component:ViewAllExpensesComponent
  },
  {
    path: 'add-expense',
    component:AddExpenseComponent
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
    LogoutComponent,
    MailSummaryComponent,
    UpdateUserInfoComponent,
    UpdatePasswordComponent,
    ContactComponent,
    MonthlyReportComponent,
    AmountValidatorDirective,
    ConfirmEqualPasswordDirective
  ],

 imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'info' ,

    }),
    NgxPopper,
    ChartsModule
  ],
  providers: [ CookieService, 
    {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  },

  LoginService, 
  GetExpensesService],
  bootstrap: [AppComponent]
})

export class AppModule { }