import { ExpenseReturned } from './ExpenseReturned';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetExpensesService {

  constructor(public http : HttpClient){  }
  private apiUrl  : string = "http://localhost:8080/user/expenses";

  getExpenses(): Observable<Response>{
  
    return this.http.get<any>(this.apiUrl);
   
  }
}
