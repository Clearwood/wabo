import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceLable'
})
export class DistanceLablePipe implements PipeTransform {

  transform(key: number): string {
    return key + ' km';
  }

}
