import {ValidatorFn, Validators} from '@angular/forms';

export const onlyNumberValidator: ValidatorFn = Validators.pattern(/^[0-9]+$/);
