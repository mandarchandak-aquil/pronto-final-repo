import {ValidatorFn, Validators} from '@angular/forms';

export const onlyNumberAndDashValidator: ValidatorFn = Validators.pattern(/^[0-9-]+$/);
