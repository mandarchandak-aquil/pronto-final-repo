import {ValidatorFn, Validators} from '@angular/forms';

export const floridaLicenseValidator: ValidatorFn = Validators.pattern(
  /^([a-zA-Z][0-9]{3})[-]([0-9]{3})[-]([0-9]{2})[-]([0-9]{3})[-]([0-9])$/
);
