import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from '../../feature/calendar/calendar.component';
import { MeetingComponent } from '../../feature/meeting/meeting.component';
import { SyllabusComponent } from '../../feature/syllabus/syllabus.component';
import { TimetableComponent } from '../../feature/timetable/timetable.component';
import { SyllabusService } from '../../auth/services/syllabus.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
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

  constructor(public dialog: MatDialog,private syllabusService: SyllabusService) {}

  timetable(): void {
    const dialogRef = this.dialog.open(TimetableComponent, {
      minWidth: '700px',
      width: '800px'
    })
  }

  calender(): void {
    const dialogRef = this.dialog.open(CalendarComponent, {
      minWidth: '550px',
      width: '550px'
    })
  }

  meeting(): void {
    const dialogRef = this.dialog.open(MeetingComponent, {
      minWidth: '300px',
      width: '400px'
    })
  }

  syllabus(): void {
    this.syllabusService.getSyllabus()
      .subscribe(response =>{
        console.log(response);
      }, error =>{
        console.log(error);
      });
    const dialogRef = this.dialog.open(SyllabusComponent, {
      minWidth: '500px',
      width: '450px'
    })
  }

  ngOnInit(): void {
  }

}
