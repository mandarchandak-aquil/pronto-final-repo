import {AbstractControl} from '@angular/forms';

export function validateBeforeCurrentDate(control: AbstractControl): {invalidDate: boolean} | null {
  const currentDate = new Date();
  if (control.value > currentDate) {
    return {
      invalidDate: true
    };
  }
  return null;
}
