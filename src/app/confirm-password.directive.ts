import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true }]
})
  export class ConfirmPasswordDirective implements Validator  {
    private valFn;
    constructor() {
      this.valFn = validatePassword();
    }

    validate(ac: AbstractControl): ValidationErrors | null {
      return this.valFn(ac);
    }
}

function validatePassword(): ValidatorFn {
  return (control: AbstractControl) => {
    //Treat as a FormGroup object to access the controls property
    let group = control as FormGroup; 

    if(group.controls['password']?.value === group.controls['confirmPassword']?.value) {
      return null;
    } else {
      return { 'mustMatch': 'false'};
    }
  }
}