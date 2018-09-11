import { User } from './../../../login-app/src/app/app.component';

import { Category } from './Category';

export interface ExpenseReturned{
    id : Number;
    user : User;
    userId : Number;
    title : String;
    category : Category;    
    date : Date;
    amount : Number;
    description : String;
    categoryName : String;
    categoryId : Number;
}