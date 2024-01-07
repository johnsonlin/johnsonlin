import { Component, ElementRef, Input, OnInit } from '@angular/core';
import Chart, {
  ChartData,
  ChartOptions,
  ChartType,
  ScaleChartOptions,
  ScaleOptions,
} from 'chart.js/auto';

@Component({
  selector: 'jl-skills-matrix',
  templateUrl: './skills-matrix.component.html',
  styleUrls: ['./skills-matrix.component.scss'],
})
export class SkillsMatrixComponent implements OnInit {
  @Input() skillsets: {
    name: string;
    type: ChartType;
    data: unknown;
  }[] = [];

  chartOptions!: { [key in 'bar' | 'radar']: ChartOptions };
  chartDataMap!: { [key: string]: ChartData };

  constructor(private elm: ElementRef) {}

  ngOnInit() {
    const commonOptions: ChartOptions = {
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
        },
      },
    };
    const axisScaleOption: ScaleOptions = {
      beginAtZero: true,
      max: 5,
      ticks: {
        display: false,
        stepSize: 1,
      },
      pointLabels: {
        font: {
          family: 'Roboto, "Helvetica Neue", Arial, sans-serif',
          size: 14,
        },
      },
    };

    this.chartOptions = {
      bar: {
        ...commonOptions,
        indexAxis: 'y',
        scales: {
          x: axisScaleOption,
        },
      },
      radar: {
        ...commonOptions,
        scales: {
          r: axisScaleOption,
        },
      },
    };
    this.chartDataMap = this.skillsets.reduce(
      (dataMap, skillset) => ({
        ...dataMap,
        [skillset.name]: this.transformChartData(skillset.data),
      }),
      {},
    );
  }

  drawChart(canvas: any, chartType: ChartType, rawData: any) {
    const data = this.transformChartData(rawData.data);
    const ticks = {
      display: false,
      beginAtZero: true,
      stepSize: 1,
      max: 5,
    };
    const pointLabels = {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontSize: 14,
    };
    let scaleOptions: ChartOptions;

    switch (chartType) {
      case 'bar':
        scaleOptions = {
          indexAxis: 'y',
          scales: {
            /*xAxes: [{
              ticks,
              pointLabels
            }]*/
          },
        };
        break;

      default:
        scaleOptions = {
          /*scale: {
            ticks,
            pointLabels
          }*/
        };
        break;
    }

    const chart = new Chart(canvas, {
      type: chartType,
      data,
      options: {
        /* legend: {
          display: false
        },*/
        ...scaleOptions,
      },
    });
  }

  transformChartData(rawData: any): ChartData {
    const skillNames = Object.keys(rawData);

    return {
      labels: skillNames,
      datasets: [
        {
          backgroundColor: 'rgba(0, 188, 212, 0.5)',
          borderColor: '#00bcd4',
          pointBackgroundColor: '#00bcd4',
          data: skillNames.map((item) => rawData[item]),
        },
      ],
    };
  }
}
