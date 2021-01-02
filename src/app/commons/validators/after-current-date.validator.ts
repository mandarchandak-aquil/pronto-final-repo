import {AbstractControl} from '@angular/forms';

export function validateAfterCurrentDate(control: AbstractControl): {invalidDate: boolean} | null {
  const currentDate = new Date();
  const todayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  if (control.value < todayDate) {
    return {
      invalidDate: true
    };
  }
  return null;
}
