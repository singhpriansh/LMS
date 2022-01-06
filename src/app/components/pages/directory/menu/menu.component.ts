import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RightClickService } from 'src/app/components/auth/services/click.service';
import { StorageService } from 'src/app/components/auth/services/storage.service';
import { default_filclip, fileclip, location, menudata } from 'src/app/components/models/Storage.model';
import { DirectoryService } from '../directory.service';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { RenameComponent } from './rename/rename.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  menudata!: menudata;
  location:string='';

  type:string='';
  cliptype:string = '';

  private menuSubs!: Subscription;
  private menudataSubs!: Subscription;
  @ViewChild('contextMenu') contextMenu!: ElementRef;

  constructor(private dialog: MatDialog,
    private dir: DirectoryService,
    private storserv: StorageService,
    private rc: RightClickService) {
  }

  ngOnInit(): void {
    this.menuSubs = this.dir.get_menu_not()
    .subscribe(value => {
      if(value){
        this.hideMenu();
      }
    });
    this.menudataSubs = this.rc.get()
    .subscribe(data => {
      this.cliptype = this.dir.getcliptype();
      this.menudata = data;
      this.type = data.object.type;
      this.location = data.location.loc;
      if(window.innerWidth-data.e.pageX < 210) {
        this.contextMenu.nativeElement.style.left = data.e.pageX-400 + "px";
      } else {
        this.contextMenu.nativeElement.style.left = data.e.pageX-196 + "px";
      }
      if(this.type === 'dir') {
        if(window.innerHeight-data.e.pageY < 30) {
          if(this.cliptype !== '') {
            this.contextMenu.nativeElement.style.top = data.e.pageY-130 + "px";
          } else {
            this.contextMenu.nativeElement.style.top = data.e.pageY-120 + "px";
          }
        }else{
          this.contextMenu.nativeElement.style.top = data.e.pageY-100 + "px";
        }
      }else if(this.type === 'folder'){
        if(window.innerHeight-data.e.pageY < 170){
          if(this.cliptype !== '') {
            this.contextMenu.nativeElement.style.top = data.e.pageY-265 + "px";
          } else {
            this.contextMenu.nativeElement.style.top = data.e.pageY-230 + "px";
          }
        } else {
          this.contextMenu.nativeElement.style.top = data.e.pageY-100 + "px";
        }
      }else{
        if(window.innerHeight-data.e.pageY < 200) {
          this.contextMenu.nativeElement.style.top = data.e.pageY-290 + "px";
        } else {
          this.contextMenu.nativeElement.style.top = data.e.pageY-100 + "px";
        }
      }
      this.contextMenu.nativeElement.style.display = "block";
    });
  }

  hideMenu() {
    this.contextMenu.nativeElement.style.display = "none";
  }

  open() {
    this.storserv.download(this.menudata.location,this.menudata.object.name)
    .subscribe(file => {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    });
  }

  download() {
    this.storserv.download(this.menudata.location,this.menudata.object.name)
    .subscribe(file => {
      saveAs(file,this.menudata.object.name);
    });
  }

  cut() {
    this.dir.setfile({
      cliptype:'cut',
      location:this.menudata.location,
      object:[this.menudata.object.name]
    });
  }

  copy() {
    this.dir.setfile({
      cliptype:'copy',
      location:this.menudata.location,
      object:[this.menudata.object.name]
    });
  }

  paste() {
    const file = this.dir.getmarkedfile();
    let path = this.menudata.location.path;
    if(this.menudata.object.type === 'folder'){
      path += this.menudata.object.name+"/";
    }
    const location:location = {
      loc: this.menudata.location.loc,
      path: path
    }
    if(file.cliptype === 'cut'){
      this.storserv.move(file.location,location,file.object)
      .subscribe(res => {
        // console.log(res);
        this.dir.setloc(this.menudata.location.loc,this.menudata.location.path);
      });
    } else {
      this.storserv.copy(file.location,location,file.object)
      .subscribe(res => {
        // console.log(res)
        this.dir.setloc(this.menudata.location.loc,this.menudata.location.path);
      });
    }
  }

  rename() {
    const dialogRef = this.dialog.open(RenameComponent, {
      minWidth: '200px',
      width: '300px',
      data: {
        type: "Rename",
        name: this.menudata.object.name
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // console.log(result)
        this.storserv.rename(this.menudata.location,
          this.menudata.object.name,result.name)
          .subscribe(res => {
            // console.log(res);
            this.dir.setloc(this.menudata.location.loc,this.menudata.location.path);
          });
      }
    });
  }

  newfolder(){
    const dialogRef = this.dialog.open(RenameComponent, {
      minWidth: '200px',
      width: '300px',
      data: {
        type: "Name"
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // console.log(result)
        this.storserv.new(this.menudata.location, result.name)
          .subscribe(res => {
            // console.log(res);
            this.dir.setloc(this.menudata.location.loc,this.menudata.location.path);
          });
      }
    });
  }
  
  emptybin() {
    this.storserv.emptybin()
    .subscribe(res => {
      console.log(res);
      this.dir.setloc(this.menudata.location.loc,this.menudata.location.path);
    });
  }

  delete() {
    this.storserv.delete(this.menudata.location,[this.menudata.object.name])
    .subscribe(res => {
      // console.log(res);
      this.dir.setloc(this.menudata.location.loc,this.menudata.location.path);
    });
  }

  restore() {
    const location:location = {
      loc: '/root',
      path: '/'
    }
    this.storserv.move(this.menudata.location,location,[this.menudata.object.name])
      .subscribe(res => {
        // console.log(res);
        this.dir.setloc(this.menudata.location.loc,this.menudata.location.path);
      });
  }

  ngOnDestroy(): void {
    this.menuSubs.unsubscribe();
    this.menudataSubs.unsubscribe();
  }
}
