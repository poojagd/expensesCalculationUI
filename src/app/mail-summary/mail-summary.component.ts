import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, APP_BOOTSTRAP_LISTENER } from '@angular/core';

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

  errorOccurred :boolean = false;
  errorMessage :string ;

  private apiUrl  : string = "http://localhost:8080/user/expenses/mail";

  onMail(){
      let promise = new Promise((resolve, reject) => {
      console.log(this.cookieService.get('email'));
      
      this.http.post(this.apiUrl, this.cookieService.get('email'))
      .toPromise()
      .then(data => {
        console.log('Promise resolved. Mail sent');
        alert("Mail Sent.");
        resolve();
      },
      err => {
        console.log(err); 
        this.errorOccurred = true;
        
        this.errorMessage = err.error.message;
       
        if(this.errorMessage == "undefined"){
          this.errorMessage = err.message;
         } 
         alert("Error occurred while sending mail.\n" + "Error message:- " + this.errorMessage);
         reject();
        }
       
      );
      alert("Sending mail to " + this.cookieService.get('email'));
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
