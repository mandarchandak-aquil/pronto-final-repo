import {Validators} from '@angular/forms';

export const onlyLetterSlashAndSpacesValidator = Validators.pattern(/^[A-Za-zñÑ/\s]+$/);
