import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'getDecimals', pure: true })
export class GetDecimalsPipe implements PipeTransform {
  constructor() {
  }

  transform(number) {
    if (number !== undefined && number !== null) {
      const parts = number.toString().split('.');
      return parts.length > 1 ? parts[1] : '00';
    }
  }
}
