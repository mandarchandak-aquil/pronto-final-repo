import {ValidatorFn, Validators} from '@angular/forms';

export const zipCodeValidator: ValidatorFn = Validators.pattern(/^[0-9]{5}$/);
