import { Pipe, PipeTransform } from '@angular/core';
import { Parametro } from 'src/app/shared/interfaces/app/frx-module/parametro';

@Pipe({
  name: 'parametroNombre'
})
export class ParametroNombrePipe implements PipeTransform {

  transform(value: Parametro): string {

    console.log('value: ',value);

    if(value === null){
      return 'Nada';
    } else {
      return value.nombre;
    }
  }

}
