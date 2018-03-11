import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateBlog'
})
export class TruncateBlogPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.length > 50 ? `${value.slice(0,51)}...` : value;
  }

}
