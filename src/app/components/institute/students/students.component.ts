import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from '../../feature/calendar/calendar.component';
import { MeetingComponent } from '../../feature/meeting-page/meeting/meeting.component';
import { TimetableComponent } from '../../feature/timetable/timetable.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  subjects = [
    "English",
    "Hindi",
    "Maths"
  ];

  constructor(private dialog: MatDialog) { }
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

  ngOnInit(): void {
  }

}
