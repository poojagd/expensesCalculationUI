import { loginUser } from './login/loginUser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  authenticated = false;
  
  constructor(private cookieService : CookieService, private http: HttpClient,public router : Router) {
  }
  
  token : String;
  LoggedInUser = {} as loginUser;
  
  authenticate(LoggedInUser) {

        console.log(LoggedInUser);
        return this.http.post<any>("http://localhost:8080/login", LoggedInUser);
   }
   
  onLogout(){
     this.cookieService.delete('token');
     this.cookieService.delete('email');
     this.router.navigate(['login']);
  }

}
