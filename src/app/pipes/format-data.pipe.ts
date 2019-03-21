import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {

  transform(value: any, start: number, end: number): any {
    if(value instanceof Array) {
      value = value.join(', ');
    }
    else {
      while(value.charAt(end) !== ' ') {
        end++;
      }
    }
    return value.substr(start, end) + '...';
  }

}
