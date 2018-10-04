import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'mail-summary',
  templateUrl: './mail-summary.component.html',
  styleUrls: ['./mail-summary.component.css']
})
export class MailSummaryComponent implements OnInit {

  ngOnInit() {
    if(this.cookieService.check('token')){
    this.onMail();
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

  constructor(public cookieService:CookieService, public http :HttpClient, public router:Router,
    public toastrService : ToastrService) { }

  errorOccurred :boolean = false;
  errorMessage :string ;

  private apiUrl  : string = "http://localhost:8080/user/expenses/mail";
  
  ngOnDestroy() {
    this.toastrService.info('Sending mail to ' + this.cookieService.get('email'), '',
      {
        timeOut: 2000,
        positionClass: 'toast-top-center'
      } );
    }
    
  onMail(){
      let promise = new Promise((resolve, reject) => {
      console.log(this.cookieService.get('email'));
      
      this.http.post(this.apiUrl, this.cookieService.get('email'))
      .toPromise()
      .then(data => {
        console.log("response-" + data);
        console.log('Promise resolved. Mail sent');
        this.toastrService.success('Mail is sent to ' + this.cookieService.get('email'),'',
        {
          timeOut: 2000,
          positionClass: 'toast-top-center',
          closeButton : true
        } );
        resolve();
      },
      err => {
        console.log("error" + err); 
        this.errorOccurred = true;
        
        this.errorMessage = err.error.message;
       
        if(this.errorMessage == undefined){
          this.errorMessage = err.message;
         } 
         this.toastrService.error('Error occurred while sending mail.\n Error message:-' + this.errorMessage,'Error',
         {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        } );
        reject();
        }
       
      );
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
