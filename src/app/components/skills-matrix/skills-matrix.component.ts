import { Component, input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType, ScaleOptions } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

import { SkillSet } from '../../models/skill.model';

@Component({
  selector: 'jl-skills-matrix',
  templateUrl: './skills-matrix.component.html',
  styleUrls: ['./skills-matrix.component.scss'],
  imports: [BaseChartDirective],
})
export class SkillsMatrixComponent implements OnInit {
  readonly skillSets = input.required<
    {
      name: string;
      type: ChartType;
      data: SkillSet;
    }[]
  >();

  chartOptions!: Record<'bar' | 'radar', ChartOptions>;
  chartDataMap!: Record<string, ChartData>;

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
    this.chartDataMap = this.skillSets().reduce(
      (dataMap, skillSet) => ({
        ...dataMap,
        [skillSet.name]: this.transformChartData(skillSet.data),
      }),
      {},
    );
  }

  transformChartData(rawData: Record<string, number>): ChartData {
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
