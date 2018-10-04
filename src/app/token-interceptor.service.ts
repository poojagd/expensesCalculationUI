import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest , HttpHandler, HttpEvent} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import {} from 'rxjs/add/operator/timeout';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private cookieService: CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${this.cookieService.get('token')}`
      }
    });
    return next.handle(tokenizedReq);
  }
}