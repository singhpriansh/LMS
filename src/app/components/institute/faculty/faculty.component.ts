import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from '../../feature/calendar/calendar.component';
import { MeetingComponent } from '../../feature/meeting/meeting.component';
import { SyllabusComponent } from '../../feature/syllabus/syllabus.component';
import { TimetableComponent } from '../../feature/timetable/timetable.component';
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
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})

export class FacultyComponent implements OnInit {
  charts: any[] = [];
  chart: any= [];
  subjects = [
    "Compiler Design",
    "Optimistion Technique",
    "Cryptography and Network Security",
    "Unix",
    "Python programming",
    "Distributed database Management System"
  ];

  constructor(public dialog: MatDialog) {}

  timetable(): void {
    const dialogRef = this.dialog.open(TimetableComponent, {
      minWidth: '700px',
      width: '800px'
    })
  }

  calender(): void {
    const dialogRef = this.dialog.open(CalendarComponent, {
      minWidth: '550px',
      width: '600px'
    })
  }

  meeting(): void {
    const dialogRef = this.dialog.open(MeetingComponent, {
      minWidth: '300px',
      width: '400px'
    })
  }

  syllabus(): void {
    const dialogRef = this.dialog.open(SyllabusComponent, {
      minWidth: '500px',
      width: '450px'
    })
  }

  ngOnInit(): void {
    this.subjects.forEach(subject => {
      this.chart = new Chart(subject, {
        type: 'bar',
        data: Sub.data,
        options: Sub.options,
      });
      this.charts.push(this.chart);
      this.chart.destroy();
    });
    // for(let i=0;i<this.subjects.length;i++){
    //   this.chart[i] = new Chart(this.subjects[i], {
    //     type: 'bar',
    //     data:Sub.data,
    //     options: Sub.options,
    //   });
    // }
  }

}
