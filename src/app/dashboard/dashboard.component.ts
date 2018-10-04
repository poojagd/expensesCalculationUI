import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
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
    if(this.cookieService.check('token')){
    this.onView();
  }
   else{
     
    this.router.navigate(['login']);
    this.toastrService.info('Please login first. ', '',
    {
      timeOut: 2000,
      positionClass: 'toast-top-center'
    } );
    }
  }

  constructor(public router:Router,public http : HttpClient,public cookieService : CookieService , public toastrService:ToastrService){  

  }
  
  elements : any[];
  list :any;
  show : boolean = false;
  private apiUrl  : string = "http://localhost:8080/user/expenses/monthwise";
  totalExpenditure : number = 0;
  errorOccurred : boolean = false;
  errorMessage : string ;
  title = 'Bar Chart';


  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  chartData = [
    {
      label: 'Amount',
      data: [], 
    }];

    colors = [
    { 
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]
  
  onChartClick(event) {
    console.log(event);
    console.log(event.active[0]._view.label);
  }

  onView()  {
    return this.http.get<any>(this.apiUrl)
    .subscribe(
      res => {
        this.elements = [res];
        this.list = this.elements[0];
        this.show = true;
        this.totalExpenditure = this.list.January + this.list.February + this.list.March + this.list.April + 
        this.list.May + this.list.June + this.list.July + this.list.August + this.list.September + 
        this.list.October + this.list.November + this.list.December ;
        console.log(this.list);
        this.chartData = [
          {
            label: 'Amount',
            data: [this.list.January , this.list.February , this.list.March , this.list.April , 
              this.list.May , this.list.June , this.list.July , this.list.August , this.list.September , 
              this.list.October , this.list.November , this.list.December] 
          }
        ];
      },
      err => {
        
        console.log(err); 
        this.errorOccurred = true;
        
        this.errorMessage = err.error.message;
       
        if(this.errorMessage == undefined) {
          this.errorMessage = err.message;
         }
    });
  }
 }
