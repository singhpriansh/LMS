import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-drive',
  templateUrl: './root-drive.component.html',
  styleUrls: ['./root-drive.component.scss']
})
export class RootDriveComponent implements OnInit {
  tiles!:number[];

  constructor() { }

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
  }

}
