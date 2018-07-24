import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit() {
  }

  firstName : String;
  lastName: String;
  emailId : String;
  password : String;
  user = {} as User;
 
  private apiUrl  : string = "http://localhost:8080/users";
  
  constructor(public http : HttpClient){  
  }
  
  onClick(){
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.emailId = this.emailId; 
    this.user.password = this.password;
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
