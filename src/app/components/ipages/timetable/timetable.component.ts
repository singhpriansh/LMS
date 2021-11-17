import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogView } from '../header/header.component';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  table = [
    ['Table','First','Second','Third','Forth','Fifth','Sixth'],
    ['Monday','1','2','3','4','5','6'],
    ['Tuesday','1','2','3','4','5','6'],
    ['Wednusday','1','2','3','4','5','6'],
    ['Thursday','1','2','3','4','5','6'],
    ['Friday','1','2','3','4','5','6'],
    ['Saturday','1','2','3','4','5','6'],
  ]

  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogView){}

  ok(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }

}
