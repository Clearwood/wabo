import {Pipe, PipeTransform} from '@angular/core';
import {DE} from '../../../assets/i18n/de';

@Pipe({
  name: 'translate'
})
export class Translate implements PipeTransform {
  public transform(key: string): any {
    const keys = key.split('.');
    const transl = keys.reduce((acc, curr) => acc[curr], DE);
    return transl ? transl : keys.pop().charAt(0).toUpperCase() + keys.pop().slice(1);
  }
}
