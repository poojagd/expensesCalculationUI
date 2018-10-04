import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  ngOnInit() {
   
     if(this.cookieService.check('token')){
      this.onLogout();
      }else{
        this.router.navigate(['login']);
      }
  
  }
  
  constructor(public loginService : LoginService, public http : HttpClient,public router : Router,public cookieService : CookieService){  
  }
  
  onLogout(){
    this.loginService.onLogout();
  }
}
