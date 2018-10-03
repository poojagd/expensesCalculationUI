import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetExpensesService } from '../get-expenses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'view-all-expenses',
  templateUrl: './view-all-expenses.component.html',
  styleUrls: ['./view-all-expenses.component.css']
})

export class ViewAllExpensesComponent implements OnInit {
 
  ngOnInit() {
    if(this.cookieService.check('token')){
      this.onView();
      }else{
        this.router.navigate(['login']);
        this.toastrService.info('Please login first. ', '',
        {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        } );
      }
  }

  expensesList : any[];
  list :any[];
  totalRec : number;
  page: number = 1;
  totalExpenditure : number = 0;
  show : boolean = false;
  errorOccurred :boolean = false;
  errorMessage :string ;

  private apiUrl  : string = "http://localhost:8080/user/expenses";

  constructor(public http : HttpClient, public getAllExpense : GetExpensesService,public cookieService :CookieService,
    public router :Router, public toastrService : ToastrService){ 
  }
  onView(){

        this.getAllExpense.getExpenses()
       .subscribe(
         res => {
           this.expensesList =  [res];
          this.list = this.expensesList[0];
          this.totalRec = this.list.length;
          this.totalExpenditure=0;
          for(var i = 0; i < this.totalRec; i++){
            this.totalExpenditure = this.totalExpenditure + this.list[i].amount;
          }
          this.show = true;
          console.log(this.totalRec);
          console.log(this.list);
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

  onDelete(expense){
    
      console.log("delete id="+ expense.id);
      this.http.delete( `${this.apiUrl}/${expense.id}`)
      .subscribe(
        res => {
          const index = this.list.indexOf(expense)
          this.list.splice(index,1);
          this.totalExpenditure = 0;
          for(var i = 0; i < this.list.length; i++) {
            this.totalExpenditure = this.totalExpenditure + this.list[i].amount;
          }
          this.toastrService.info('Expense with amount ' + expense.amount + ' is deleted.', '',
            {
              timeOut: 2000,
              positionClass: 'toast-top-center'
            });
            console.log(res);
        },
        err => {
            console.log(err); 
          this.errorOccurred = true;
          
          this.errorMessage = err.error.message;
         
          if(this.errorMessage == undefined){
            this.errorMessage = err.message;
          }
        }
      );
  }
}
