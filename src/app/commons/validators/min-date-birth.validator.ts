import {AbstractControl} from '@angular/forms';

export function validateMinDateOfBirth(control: AbstractControl): {invalidDate: boolean} | null {
  const currentDate = new Date();
  const yearsAgo = new Date(
    currentDate.getFullYear() - 200,
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );
  if (control.value < yearsAgo) {
    return {
      invalidDate: true
    };
  }
  return null;
}
