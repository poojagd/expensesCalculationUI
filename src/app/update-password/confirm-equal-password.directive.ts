import {Validator, NG_VALIDATORS, AbstractControl} from '@angular/forms';
import { Directive,Input } from '@angular/core';

@Directive({
    selector : '[appConfirmEqualPasswordValidator]',
    providers : [{
        provide : NG_VALIDATORS,
        useExisting : ConfirmEqualPasswordDirective,
        multi : true
    }]
})
export class ConfirmEqualPasswordDirective implements Validator{
    @Input() appConfirmEqualPasswordValidator: string;

    validate(control : AbstractControl) : { [key : string]: any } | null{
        const controlToCompare = control.parent.get(this.appConfirmEqualPasswordValidator);
        
        if(controlToCompare  && controlToCompare.value !== control.value ){
            return { 'notEqual' : true };
        }
        return null;
    }
}