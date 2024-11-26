import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expirationDate',
  standalone: true
})
export class ExpirationDatePipe implements PipeTransform {

  transform(month: number, year: number): string {

    var monthString = month.toString()
    if (month < 10) {
      monthString = `0${monthString}`
    }

    var yearString = year.toString().slice(-2);

    return `${monthString}/${yearString}`;
  }

}
