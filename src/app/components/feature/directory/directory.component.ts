import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectoryComponent implements OnInit {
  tiles:number[] = [0];
  path:string = "/ ";

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
