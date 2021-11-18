import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SyllabusComponent } from '../../ipages/syllabus/syllabus.component';
import { TimetableComponent } from '../../ipages/timetable/timetable.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})

export class FacultyComponent implements OnInit {
  subjects = [
    "English",
    "Hindi",
    "Maths"
  ];

  constructor(public dialog: MatDialog) {}

  timetable(): void {
    const dialogRef = this.dialog.open(TimetableComponent, {
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
