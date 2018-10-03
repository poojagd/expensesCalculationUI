import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  ngOnInit() {
    if(!this.cookieService.check('token')){
           this.router.navigate(['login']);
      this.toastrService.info('Please login first. ', '',
      {
        timeOut: 2000,
        positionClass: 'toast-top-center'
      } );
    }
  }

  password : String = "";
  errorOccurred :boolean = false;
  errorMessage :string ;
  confirmpassword : String = "";
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Do you want to save new password?';

  private apiUrl  : string = "http://localhost:8080/users/password";
  
  constructor(public http : HttpClient, public router : Router,public toastrService : ToastrService,public cookieService : CookieService){  
  }
  onClick(){

    if(this.password == ""){
      this.errorOccurred = true;
      this.errorMessage = "Please enter new password to be updated.";
      return null;
    }
    this.errorOccurred = false;
   
        return this.http.put(this.apiUrl, this.password)
       .subscribe(
        res => {
          console.log(res);
          this.toastrService.success('Password has been updated.', '',
          {
            timeOut: 2000,
             positionClass: 'toast-top-center'
          });
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err); 
          this.errorOccurred = true;
         
          this.errorMessage = err.error.message;
         
          if(this.errorMessage == undefined){
            this.errorMessage = err.message;
          }

        });
  }

}
