import {Pipe, PipeTransform} from '@angular/core';
import {DE} from '../../../assets/i18n/de';
import {EN} from '../../../assets/i18n/en';

@Pipe({
  name: 'translate'
})
export class Translate implements PipeTransform {

  constructor() {
  }

  public transform(key: string): any {
    const lang = localStorage.getItem('language') === 'de-DE' ? DE : EN;
    const keys = key.split('.');
    return keys.reduce((acc, curr) => acc ? acc[curr] : null, lang);
  }

}
