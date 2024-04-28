import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogView } from 'src/app/components/ipages/header/header.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  meeting: boolean= true;
  constructor(public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogView ){}

  exit(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
