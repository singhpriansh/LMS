import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  chart: any = [];
  id="strng";

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart(this.id, {
      type: 'bar',
      data:Sub.data,
      options: Sub.options,
    });
  }

}
