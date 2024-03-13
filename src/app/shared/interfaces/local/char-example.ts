import { ApexChart, ApexNonAxisChartSeries } from "ng-apexcharts";

export interface CharExample {
    charSeries: ApexNonAxisChartSeries;
    chartDetails: ApexChart | null;
    chartLabels: string[];
    chartTitle: {};
    colors: string[];
}
