import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RightClickService } from 'src/app/components/auth/services/click.service';
import { StorageService } from 'src/app/components/auth/services/storage.service';
import { menudata } from 'src/app/components/models/Storage.model';
import { DirectoryService } from '../directory.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  menudata!: menudata;

  folder:string='';

  private menuSubs!: Subscription;
  private menudataSubs!: Subscription;
  @ViewChild('contextMenu') contextMenu!: ElementRef;

  constructor(private dir: DirectoryService,
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
      this.menudata = data;
      this.folder = data.object.type;
      this.contextMenu.nativeElement.style.left = data.e.pageX-190 + "px";
      this.contextMenu.nativeElement.style.top = data.e.pageY-80 + "px";
      this.contextMenu.nativeElement.style.display = "block";
    });
  }

  hideMenu() {
    this.contextMenu.nativeElement.style.display = "none";
  }

  download() {
    this.storserv.download(this.menudata.location,this.menudata.object.name)
    .subscribe(file => {
      saveAs(file,this.menudata.object.name);
    });
  }

  cut() {
    this.dir.setfile(this.menudata.location,this.menudata.object.name);
  }

  paste() {
    console.log(this.dir.getmarkedfile());
    console.log(this.menudata.location,this.menudata.object.name);
  }
  
  delete() {
    this.storserv.delete(this.menudata.location,this.menudata.object.name)
    .subscribe(file => {
      console.log(file);
      this.dir.setloc(this.menudata.location.loc,this.menudata.location.path);
    });
  }

  ngOnDestroy(): void {
    this.menuSubs.unsubscribe();
    this.menudataSubs.unsubscribe();
  }
}
