import {ValidatorFn, Validators} from '@angular/forms';

export const bankRoutingNumberValidator: ValidatorFn = Validators.pattern(/^[0-9]{9}$/);
