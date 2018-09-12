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

  firstName : String;
  lastName: String;
  email : String;
  password : String;
  user = {} as User;
  errorOccurred :boolean = false;
  errorMessage :string ;

  private apiUrl  : string = "http://localhost:8080/users";
  
  constructor(public http : HttpClient, public router : Router){  
  }
  
  onClick(){
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.email = this.email; 
    this.user.password = this.password;
  console.log(this.user)
        return this.http.post(this.apiUrl,this.user)
       .subscribe(
        res => {
          console.log(res);
          alert("You are registered. Please login.");
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
