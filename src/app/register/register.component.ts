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
          this.router.navigate(['login']);
        },
        err => {
          console.log(err); 
        });
      
  }
  onhome(){
    this.router.navigate(['home']);
  }
}
