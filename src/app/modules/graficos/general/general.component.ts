import { Component } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { CharExample } from 'src/app/shared/interfaces/local/char-example';
import { GrafApex } from 'src/app/shared/interfaces/local/graf-apex';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {


  chartDetails: ApexChart = {
    width: 380,
    type: 'donut',
    toolbar: {
      show: true
    }
  }

  chartExampleIngresos: CharExample = {
    charSeries: [52, 68, 39],
    chartDetails: this.chartDetails,
    chartLabels: ['Laboratorio', 'Servicios', 'Otros'],
    chartTitle: {
      text: 'Ingresos',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: '#3494a6'
      },
    },
    colors: []
  }

  chartExampleMuestras: CharExample = {
    charSeries: [80, 20, 12, 3],
    chartDetails: this.chartDetails,
    chartLabels: ['Pendientes', 'Concluidas', 'Aprobas', 'Fallidas'],
    chartTitle: {
      text: 'Muestras',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: '#3494a6'
      },
    },
    colors: []
  }

  chartExampleGastos: CharExample = {
    charSeries: [8000, 20000, 3000, 12000],
    chartDetails: this.chartDetails,
    chartLabels: ['Laboratorio', 'Personales', 'Otros', 'Seguro'],
    chartTitle: {
      text: 'Gastos',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: '#3494a6'
      },
    },
    colors: []
  }

  chartExampleOtros: CharExample = {
    charSeries: [15, 65, 12],
    chartDetails: this.chartDetails,
    chartLabels: ['Otros 1', 'Otros 2', 'Otros 3',],
    chartTitle: {
      text: 'Otros',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: '#3494a6'
      },
    },
    colors: []
  }
}
