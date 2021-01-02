import {Validators} from '@angular/forms';

export const onlyLetterAndSpacesValidator = Validators.pattern(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s-]+$/);
