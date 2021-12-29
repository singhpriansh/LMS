import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RightClickService } from 'src/app/components/auth/services/click.service';
import { StorageService } from 'src/app/components/auth/services/storage.service';
import { DirectoryService } from '../directory.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  private menuSubs!: Subscription;
  private menudata!: Subscription;
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
    this.menudata = this.rc.get()
    .subscribe(data => {
      if(this.contextMenu.nativeElement.style.display== "block"){
        this.hideMenu();
      }else{
        this.contextMenu.nativeElement.style.display = "block";
        this.contextMenu.nativeElement.style.left = data.e.pageX-190 + "px";
        this.contextMenu.nativeElement.style.top = data.e.pageY-80 + "px";
      }
    });
  }

  hideMenu(){
    this.contextMenu.nativeElement.style.display = "none";
  }
  
  ngOnDestroy(): void {
    this.menuSubs.unsubscribe();
    this.menudata.unsubscribe();
  }
}
