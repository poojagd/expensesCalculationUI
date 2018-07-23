import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  firstName : String;
  lastName : String;
  emailId : String;
  password : String;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit() {
  }

  ngFirstName : String;
  ngLastName: String;
  ngEmailId : String;
  ngPassword : String;
  user = {} as User;
 
  private apiUrl  : string = "http://localhost:8080/users";
  
  constructor(public http : HttpClient){  
  }
  
  onClick(){
    this.user.firstName = this.ngFirstName;
    this.user.lastName = this.ngLastName;
    this.user.emailId = this.ngEmailId; 
    this.user.password = this.ngPassword;
        return this.http.post(this.apiUrl,this.user)
       .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured"); 
        });
      
  }
}
