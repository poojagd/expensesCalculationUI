import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AddExpenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path : 'add-expense',component:AddExpenseComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }