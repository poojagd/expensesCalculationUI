import { ToastrService } from 'ngx-toastr';
import { element } from './element';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  ngOnInit() {
    if(this.cookieService.check('token')){
      this.show=true;
      this.onclick(this.month);
    }else{
      this.router.navigate(['login']);
      this.toastrService.info('Please login first. ', '',
      {
        timeOut: 2000,
        positionClass: 'toast-top-center'
      } );
    }
   
  }
  constructor(public router:Router,public http : HttpClient,public cookieService : CookieService,public toastrService : ToastrService){  

  }
  
  amountList : any[];
  categoryList : any[];
  show : boolean = true;
  elementList: element[] = [];
  length : number = 0;
  totalExpenditure : number = 0;
  month : String = 'JAN';

  private apiUrl  : string ;

  errorOccurred : boolean = false;
  errorMessage : string ;

  public pieChartLabels:string[] = [];
  public pieChartData:number[]=[]  ;
  public pieChartType:string = 'pie';
 
   // events
   public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  onclick(month){
  this.show = true;
  this.elementList = [];
  this.apiUrl = "http://localhost:8080/user/expenses/monthReport";
  this.month = month;
  return this.http.get<any>(`${this.apiUrl}/${this.month}`)
  .subscribe(
    res => {
   
     this.totalExpenditure = res.totalExpenditure;
     delete res['totalExpenditure'];
      
     this.categoryList = Object.keys(res);
     this.length = this.categoryList.length;
     this.amountList = Object.values(res);
   
     this.pieChartLabels = this.categoryList;
     this.pieChartData =  this.amountList;
     
     if(this.totalExpenditure == 0){
       this.show = false;
     }
   
     for(var i = 0; i < this.length ; i++){
      this.elementList.push({
        key : this.categoryList[i],
      value : this.amountList[i]
    }) ;
    console.log("i=" + i);
   }
     console.log("elementlist: " + this.elementList.values);
     console.log(this.totalExpenditure);
     console.log(this.amountList);
     console.log(this.categoryList);
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
