import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogView } from '../header/header.component';

export interface TimeTable {
  day: String;
  Period1: String;
  Period2: String;
  Period3: String;
  Period4: String;
  Period5: String;
  Period6: String;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
];

const timetable: TimeTable[] = [
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
  timetableDataSource = timetable;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogView){}

  ok(): void {
    this.dialogRef.close();
    console.log(timetable)
  }
  
  ngOnInit(): void {
  }

}
