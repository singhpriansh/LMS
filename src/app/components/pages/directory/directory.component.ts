import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { DirectoryService } from './directory.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectoryComponent implements OnInit,OnDestroy {
  view:string = "grid";
  back:boolean = false;
  location:string = "";
  path!:string;

  constructor(private dir: DirectoryService,
    private router: Router) { }

  onviewClick() {
    (this.view=='list')?this.view='grid':this.view='list';
    this.dir.setIcon(this.view);
  }

  setPath(value: string){
    this.back = false;
    if(value == '/storage/drive'){
      this.dir.setloc('Drive','/');
      this.path = "Drive /";
    }else if(value == '/storage/shared'){
      this.dir.setloc('Shared','/');
      this.path = "Shared /";
    }else {
      this.dir.setloc('Trash','');
      this.path = "Trash";
    }
  }

  onbackClick() {}
  
  ngOnInit(): void {
    this.setPath(this.router.url);
    this.router.events.subscribe((event: Event)=> {
      if(event instanceof NavigationEnd){
        this.setPath(event.url);
        this.dir.setIcon(this.view);
      }
    })
  }

  ngOnDestroy(): void {}

}
