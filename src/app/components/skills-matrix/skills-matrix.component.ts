import { Component, Input, OnInit } from '@angular/core';
import {
  ChartData,
  ChartOptions,
  ChartType,
  ScaleOptions,
} from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
import { NgIf } from '@angular/common';

@Component({
  selector: 'jl-skills-matrix',
  templateUrl: './skills-matrix.component.html',
  styleUrls: ['./skills-matrix.component.scss'],
  imports: [
    BaseChartDirective,
    NgIf,
  ],
})
export class SkillsMatrixComponent implements OnInit {
  @Input() skillsets: {
    name: string;
    type: ChartType;
    data: unknown;
  }[] = [];

  chartOptions!: { [key in 'bar' | 'radar']: ChartOptions };
  chartDataMap!: { [key: string]: ChartData };

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
