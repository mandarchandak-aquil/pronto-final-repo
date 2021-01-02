import {ValidatorFn, Validators} from '@angular/forms';

export const countiesValidator: ValidatorFn = Validators.pattern(/^([a-zA-ZñÑ\s-])([^0-9])+$|^(?=\d*[a-zA-ZñÑ\s]+[^0-9])[\w\d\s-]+$/);
