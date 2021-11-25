import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated=false;

  constructor(
    // private authListenerSubs: Subscription,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {}

  goRegister(): void {
    const dialogRef = this.dialog.open(DialogView, {
      width: '300px'
    })

    // dialogRef.afterClosed().subscribe(result =>{
    //   console.log('The dialog was closed');
    // })
  }

  logout() {
    this.loginService.logOutUser();
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.loginService.IsAuth();
    this.loginService
      .getAuthStatusListerner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      })
  }

  ngOnDestroy(): void {
    this.loginService.getAuthStatusListerner().unsubscribe();
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