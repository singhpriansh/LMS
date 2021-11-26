import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from '../../feature/calendar/calendar.component';
import { SyllabusComponent } from '../../feature/syllabus/syllabus.component';
import { TimetableComponent } from '../../feature/timetable/timetable.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})

export class FacultyComponent implements OnInit {
  subjects = [
    "English",
    "Hindi",
    "Maths",
    "Science"
  ];

  constructor(public dialog: MatDialog) {}

  timetable(): void {
    const dialogRef = this.dialog.open(TimetableComponent, {
      width: '600px'
    })
  }

  calender(): void {
    const dialogRef = this.dialog.open(CalendarComponent, {
      width: '600px'
    })
  }

  syllabus(): void {
    const dialogRef = this.dialog.open(SyllabusComponent, {
      width: '450px'
    })
  }

  ngOnInit(): void {
  }

}
