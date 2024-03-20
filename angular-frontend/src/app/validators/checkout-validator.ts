import { FormControl, ValidationErrors } from "@angular/forms";

export class CheckoutValidator {
    // validate if string only contains whitespace
    static notOnlyWhitespace(control: FormControl): ValidationErrors | null{
        if(control.value!= null && control.value.trim().length===0){
            return {'notOnlyWhitespace': true}
        }
        else{
            return null;
        }
    }
}
