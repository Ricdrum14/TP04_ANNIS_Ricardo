import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caviarder',
  standalone: true
})
export class CaviarderPipe implements PipeTransform {

  transform(value: string, visibleDigits: number = 4): string {
    if ( !value) return '';

    const maskedSection = '*'.repeat(value.length - visibleDigits);
    const visibleSection = value.slice(-visibleDigits);
    

    // On ajoute des espaces pour un formatage en groupes de quatre chiffres
    return maskedSection.replace(/(.{4})/g, '$1 ') + visibleSection;
  }

}
