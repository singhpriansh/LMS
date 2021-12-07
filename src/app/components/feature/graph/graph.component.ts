import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import * as Sub from "../../auth/services/subject";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GraphComponent implements OnInit {
  @Input() id!: string;
  chart: any = [];

  constructor() { }

  chart_maker(id:string) {
    return (new Chart(id,{
      type: 'bar',
      data:Sub.data,
      options: Sub.options,
    }));
  }

  ngOnInit(): void {
  }
}
