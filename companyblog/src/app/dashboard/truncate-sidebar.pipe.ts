import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateSidebar'
})
export class TruncateSidebarPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.length > 25 ? `${value.slice(0,51)}...` : value;
  }

}
