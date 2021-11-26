import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogView } from '../../ipages/header/header.component';

export interface TimeTable {
  day: String;
  Period1: String;
  Period2: String;
  Period3: String;
  Period4: String;
  Period5: String;
  Period6: String;
}

const TIMETABLE: TimeTable[] = [
  {day:'Monday',Period1:'1',Period2:'2',Period3:'3',
    Period4:'4',Period5:'5',Period6:'6'},
  {day:'Tuesday',Period1:'1',Period2:'2',Period3:'3',
    Period4:'4',Period5:'5',Period6:'6'},
  {day:'Wednusday',Period1:'1',Period2:'2',Period3:'3',
    Period4:'4',Period5:'5',Period6:'6'},
  {day:'Thursday',Period1:'1',Period2:'2',Period3:'3',
    Period4:'4',Period5:'5',Period6:'6'},
  {day:'Friday',Period1:'1',Period2:'2',Period3:'3',
    Period4:'4',Period5:'5',Period6:'6'},
  {day:'Saturday',Period1:'1',Period2:'2',Period3:'3',
    Period4:'4',Period5:'5',Period6:'6'},
]

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})

export class TimetableComponent implements OnInit {
  columns: string[] = ['day','Period1','Period2',
    'Period3','Period4','Period5','Period6'];
  timetable = TIMETABLE;
  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogView){}

  ok(): void {
    this.dialogRef.close();
    console.log(TIMETABLE)
  }
  
  ngOnInit(): void {
  }

}
