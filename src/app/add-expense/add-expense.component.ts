import { AmountValidatorDirective } from './amount-validator.directive';
import { Expense } from './../Expense';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {BsDatepickerConfig} from './../../../node_modules/ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})

export class AddExpenseComponent extends DatePipe implements OnInit {

   ngOnInit() {
    if(!this.cookieService.check('token')){
         this.router.navigate(['login']);
         this.toastrService.info('Please login first. ', '',
          {
            timeOut: 2000,
            positionClass: 'toast-top-center'
          } );
      }
    this.getCategoryNames();
  }

  datePickerConfig : Partial<BsDatepickerConfig>;
  title : String = null;
  date :  Date = null;
  amount : Number;
  categoryName : String = null;
  description : String = null;
  expense = {} as Expense;
  private apiUrl  : string = "http://localhost:8080/user/expenses";
  errorOccurred : boolean = false;
  errorMessage : string = "None";
  allCategoryNames : string[] = null;
  list : any[] = null;
  
 constructor(public http : HttpClient,public router:Router,public cookieService :CookieService,
    public toastrService : ToastrService)
  { 
    super("http");
    this.datePickerConfig = Object.assign( {} , { containerClass: 'theme-dark-blue'});
  }

  getCategoryNames(){
    return this.http.get<string>("http://localhost:8080/category/names")
    .subscribe(
      res => {
       
        this.list  = [res];
        this.allCategoryNames = this.list[0];
        console.log(this.allCategoryNames)
      },
      err =>{
       console.log(err); 
       this.errorOccurred = true;
       
       this.errorMessage = err.error.message;
      
       if(this.errorMessage == undefined){
         this.errorMessage = err.message;
       }
      }
    )

  }

  onAddExpense(){
    if(this.amount == undefined || this.categoryName == null || this.date == null){
    console.log('Invalid data.') ;
    this.errorOccurred = true;
    this.errorMessage = "Please enter required fields.";
    return null;
    }
    if(this.amount <= 0 )
    {
      console.log('Amount is negative or 0.') ;
      this.errorOccurred = true;
      this.errorMessage = "Please enter positive, non-zero number.";
      return null;
    }
    else if( !(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/mg.test(this.amount.toString())) )
    {
    console.log('Invalid data.Please enter valid data.') ;
    this.errorOccurred = true;
    this.errorMessage = "Please enter valid amount.";
    return null;
    }

   
    
    this.errorOccurred = false;
    this.expense.title = this.title;
    this.expense.date = this.date ;
    this.expense.amount = this.amount;
    this.expense.categoryName = this.categoryName; 
    this.expense.description = this.description;
    console.log(this.expense);
    return this.http.post(this.apiUrl,this.expense)
       .subscribe(
        res => {
          console.log(res);
          this.toastrService.info('New Expense is added.','',{
            timeOut: 4000,
            positionClass: 'toast-top-right'
          } );
          this.router.navigate(['dashboard']);
        },
        err => {
          console.log(err); 
          this.errorOccurred = true;
          
          this.errorMessage = err.error.message;
          
          if(this.errorMessage == "undefined"){
            this.errorMessage = err.message;
           }
       });
  }
}
