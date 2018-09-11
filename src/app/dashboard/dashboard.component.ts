import { ViewAllExpensesComponent } from './../view-all-expenses/view-all-expenses.component';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit() {
    this.onView();
  }

  constructor(public router:Router,public http : HttpClient){  
  }

  elements : any[];
  list :any;
  show : boolean = false;
  private apiUrl  : string = "http://localhost:8080/user/expenses/monthwise";
  totalExpenditure : number = 0;
   
  onView(){
    return this.http.get<any>(this.apiUrl)
    .subscribe(
      res => {
        this.elements = [res];
        this.list = this.elements[0];
        this.show = true;
        this.totalExpenditure=this.list.January + this.list.February + this.list.March + this.list.April + 
        this.list.May + this.list.June + this.list.July + this.list.August + this.list.September + 
        this.list.October + this.list.November + this.list.December ;
        console.log(this.list);
      }
    );
  }
  }
