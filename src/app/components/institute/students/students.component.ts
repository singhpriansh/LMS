import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../auth/services/student.service';
import { CalendarComponent } from '../../feature/calendar/calendar.component';
import { MeetingComponent } from '../../feature/meeting/meeting.component';
import { SyllabusComponent } from '../../feature/syllabus/syllabus.component';
import { TimetableComponent } from '../../feature/timetable/timetable.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  subjects:Array<any> = [];

  constructor(private dialog: MatDialog,
    private studService: StudentService) { }
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
    this.studService.getSyllabus()
    .subscribe(res => {
      for (let key of Object.keys(res.subjects)){
        this.subjects.push({ code:key, subject: res.subjects[key] });
      }
    })
  }

}
