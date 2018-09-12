import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from './../../../node_modules/ngx-bootstrap';


@Component({
  selector: 'mail-summary',
  templateUrl: './mail-summary.component.html',
  styleUrls: ['./mail-summary.component.css']
})
export class MailSummaryComponent implements OnInit {

  ngOnInit() {
    this.onMail();
  }

  constructor(public cookieService:CookieService, public http :HttpClient, public router:Router) { }

  private apiUrl  : string = "http://localhost:8080/user/expenses/mail";

  onMail(){
    let promise = new Promise((resolve, reject) => {
      console.log(this.cookieService.get('email'));
      
      this.http.post(this.apiUrl, this.cookieService.get('email'))
      .toPromise()
      .then(data => {
        console.log('Promise resolved. Mail sent');
        resolve();
      },
      err => {
            console.log(err); 
        }
      );
      alert("Mail Sent.");
      this.router.navigate(['dashboard']);
      
      //  .subscribe(
      //   async res => {
      //     console.log(res);
      //     this.router.navigate(['dashboard']);
      //   },
      //   err => {
      //     console.log(err); 
      //   });
      });
      return promise;
   }
 
}
