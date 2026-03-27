import {Validator, NG_VALIDATORS, AbstractControl} from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector : '[appAmountValidator]',
    providers : [{
        provide : NG_VALIDATORS,
        useExisting : AmountValidatorDirective,
        multi : true
    }]
})
export class AmountValidatorDirective implements Validator{
    validate(control : AbstractControl) : { [key : string]: any } | null{
        
        let isValid = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/mg.test(control.value);
        // let valid = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/mg.test('12.3');
        // console.log("valid" + valid);
        if(control.value !== 0 && !isNaN(control.value) && isValid && control.value > 0){
            return null;
        }
        else {
            return { 'notValid' : true };
        }

    }
}