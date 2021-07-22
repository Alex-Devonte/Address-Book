import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
  }

  // Set filter params to first and last names only
  return items.filter(item => (item?.firstName.toLowerCase().indexOf(filter.toLowerCase()) !== -1) || item?.lastName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}
