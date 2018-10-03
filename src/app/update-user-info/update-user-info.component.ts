import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {User } from '../register/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
@Component({
  selector: 'update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {

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

  firstName : String = "";
  lastName: String = "" ;
  
  user = {} as User;
  errorOccurred :boolean = false;
  errorMessage :string ;

  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Do you want to save the changes?';

  private apiUrl  : string = "http://localhost:8080/users/";
  
  constructor(public http : HttpClient, public router : Router,public toastrService : ToastrService,public cookieService :CookieService){  
  }
  
  onConfirm(){

    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.email = "";
    this.user.password = "";
    if(this.firstName == "" && this.lastName == ""){
      this.errorOccurred = true;
      this.errorMessage = "Cannot update blank fields. Please enter the user information to be updated.";
      return null;
    }
   
    this.errorOccurred = false;
   
        return this.http.put<User>(this.apiUrl,this.user)
       .subscribe(
        res => {
          console.log(res);
          this.toastrService.success('User information has been updated.', '',
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
