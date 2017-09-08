import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any) {
    return parseFloat(String(value)).toFixed(2);
  }

}
