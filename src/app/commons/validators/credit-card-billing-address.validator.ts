import {ValidatorFn, Validators} from '@angular/forms';

export const creditCardBillingAddressValidator: ValidatorFn = Validators.pattern(/^[A-Za-z0-9ñÑ\s,.'-]{0,60}$/);
