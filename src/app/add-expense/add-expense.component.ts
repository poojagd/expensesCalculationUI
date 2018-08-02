import { Component, OnInit } from '@angular/core';
import { Category } from './Category';
import { HttpClient } from '@angular/common/http';
import { Expense } from './Expense';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent extends DatePipe implements OnInit {

   ngOnInit() {
  }
  title : String;
  date :  Date;
  amount : Number;
  category = {} as Category;
  categoryName : String;
  description : String;
  expense = {} as Expense;
  
   private apiUrl  : string = "http://localhost:8080/expenses/65";
  
  constructor(public http : HttpClient){ 
    super("http");
  }
  
  onAddExpense(){
    this.expense.title = this.title;
    this.expense.date = this.date ;
    this.expense.amount = this.amount;
    this.expense.category = this.category;
    this.expense.category.categoryName = this.categoryName; 
    this.expense.description = this.description;
    console.log(this.expense);
        return this.http.post(this.apiUrl,this.expense)
       .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured"); 
        });
      
  }
}
