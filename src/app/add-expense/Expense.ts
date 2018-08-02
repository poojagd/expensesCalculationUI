import { Category } from "./Category";

export interface Expense{
    title : String;
    date : Date;
    amount : Number;
    category : Category;
    description : String;
}