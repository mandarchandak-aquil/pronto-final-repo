import {AbstractControl} from '@angular/forms';

export function insuredDriverMaxDOBValidator(control: AbstractControl): {invalidDate: boolean} | null {
  const currentDate = new Date();
  const yearsAgo = new Date(
    currentDate.getFullYear() - 17,
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
