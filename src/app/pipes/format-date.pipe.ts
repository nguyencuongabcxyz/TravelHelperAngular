import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDate implements PipeTransform {

  transform(value: any, format: string): any {


    return formatDate(value, format, 'en-US', 'UTC+14')
  }

}
