import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetExpensesService } from '../get-expenses.service';

@Component({
  selector: 'view-all-expenses',
  templateUrl: './view-all-expenses.component.html',
  styleUrls: ['./view-all-expenses.component.css']
})

export class ViewAllExpensesComponent implements OnInit {
 
  ngOnInit() {
    this.onView();
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

  constructor(public http : HttpClient, public getAllExpense : GetExpensesService){ 
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
         
          if(this.errorMessage == "undefined"){
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
            console.log(res);
        },
        err => {
            console.log(err); 
          this.errorOccurred = true;
          
          this.errorMessage = err.error.message;
         
          if(this.errorMessage == "undefined"){
            this.errorMessage = err.message;
          }
        }
      );
  }
}
