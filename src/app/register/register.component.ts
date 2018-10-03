import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit() {
  }

  firstName : String = null;
  lastName: String = null ;
  email : String = null;
  password : String = null;
  user = {} as User;
  errorOccurred :boolean = false;
  errorMessage :string ;

  private apiUrl  : string = "http://localhost:8080/users";
  
  constructor(public http : HttpClient, public router : Router ,public toastrService : ToastrService){  
  }
  
  onClick(){
    if(this.email == null || this.password == null){
      this.errorOccurred = true;
      this.errorMessage = "Please enter required fields.Email-id and password are mandatory.";
      return null;
    }
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.email = this.email; 
    this.user.password = this.password;
  console.log(this.user)
        return this.http.post(this.apiUrl,this.user)
       .subscribe(
        res => {
          console.log(res);
          this.toastrService.success('You are successfully registered.Please login.','',{
            timeOut: 4000,
            positionClass: 'toast-top-centre'
          } );
          this.router.navigate(['login']);
        },
        err => {
          console.log(err); 
          this.errorOccurred = true;
         
          this.errorMessage = err.error.message;
         
          if(this.errorMessage == "undefined"){
            this.errorMessage = err.message;
          }
        });
      
  }
  onhome(){
    this.router.navigate(['home']);
  }
}
