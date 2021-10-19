import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  goRegister(): void {
    const dialogRef = this.dialog.open(DialogView, {
      width: '300px'
    })

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed');
    })
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-view',
  templateUrl: './dialog-view.html',
  styleUrls: ['./header.component.scss']
})

export class DialogView {

  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogView ){}

    onFaculty(): void {
      this.dialogRef.close();
    }
    onStudent(): void {
      this.dialogRef.close();
    }
}