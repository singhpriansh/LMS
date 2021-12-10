import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IconService } from '../directory-icon.service';

@Component({
  selector: 'app-root-drive',
  templateUrl: './root-drive.component.html',
  styleUrls: ['./root-drive.component.scss']
})
export class RootDriveComponent implements OnInit, OnDestroy{
  iconview!:string;
  tiles!:number[];
  private iconStatSub!: Subscription;

  constructor(private icon: IconService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(window.innerWidth>1097){
      if(window.innerWidth>1500){
        this.tiles = [0,1,2,3];
      }else{
        this.tiles = [0,1,2];
      }
    }else{
      if(window.innerWidth>670){
        this.tiles = [0,1];
      }else{
        this.tiles = [0];
      }  
    }
  }  

  ngOnInit(): void {
    this.onResize();
    this.iconStatSub = this.icon.getIcons()
    .subscribe(icon => {
      this.iconview = icon;
    });
  }

  ngOnDestroy(): void {
    this.iconStatSub.unsubscribe();
  }
}
