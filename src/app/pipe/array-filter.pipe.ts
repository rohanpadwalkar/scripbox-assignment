import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(items: any[], filterString: string): unknown {
    if (!items || !filterString) {
      return items;
    }
    return items.filter(item => item?.title?.toLowerCase().indexOf(filterString?.toLowerCase()) !== -1);
  }

}
