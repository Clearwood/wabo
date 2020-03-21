import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DE} from '../../../assets/i18n/de';
import {EN} from '../../../assets/i18n/en';

@Pipe({
  name: 'translate'
})
export class Translate implements PipeTransform {

  public transform(key: string): any {
    const lang = environment.lang === 'de' ? DE : EN;
    const keys = key.split('.');
    const transl = keys.reduce((acc, curr) => acc ? acc[curr] : null, lang);
    return transl ? transl : keys.pop().charAt(0).toUpperCase() + keys.pop().slice(1);
  }
}
