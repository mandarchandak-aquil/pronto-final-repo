import {AbstractControl} from '@angular/forms';

export function excludedDriverMaxDOBValidator(control: AbstractControl): {invalidDate: boolean} | null {
  const currentDate = new Date();
  const yearsAgo = new Date(
    currentDate.getFullYear() - 15,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  if (control.value > yearsAgo) {
    return {
      invalidDate: true
    };
  }
  return null;
}
