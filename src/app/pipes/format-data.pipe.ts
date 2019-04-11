import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {

  transform(value: any, start: number, end: number): any {
    if(!value){
      return '';
    }
    if(value instanceof Array) {
      //console.log(value);
      value = value.join(', ');
    }
    // else {
    //   while(value.charAt(end) !== ' ' && value.charAt(end)) {
    //     end++;
    //   }
    // }

    return value.slice(start, end) + (end > value.length ? '' : '...');
  }

}
