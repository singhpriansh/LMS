import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../auth/services/storage.service';
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
  location!: {
    loc:string,
    path:string
  };
  path!:string;
  private locSubs!: Subscription;

  constructor(private dir: DirectoryService,
    private router: Router,
    private drive: StorageService) {
      this.locSubs = this.dir.getloc()
      .subscribe(res => {
        this.location = res;
        if(res.loc == '/root'){
          this.path = "Drive";
        }else if(res.loc == '/shared'){
          this.path = "Shared";
        }else {
          this.path = "Trash";
        }
        this.back = false;
        let totpath = res.path.split('/');
        for(let i=1;i<totpath.length-1;i++){
          this.back = true;
          this.path += " / "+totpath[i];
        }
      })
    }

  onviewClick() {
    (this.view=='list')?this.view='grid':this.view='list';
    this.dir.setIcon(this.view);
  }

  fileupload(event: any) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    console.log((event.target as HTMLInputElement).files);
    if(file){
      const files = new FormData();
      let detail = JSON.stringify({
        name: file?.name.toLowerCase().split(' ').join("_"),
        path: this.location.path.split("/").join(" ")
      })
      files.append("file",file,detail);
      this.drive.upload(files)
      .subscribe(res => {
        if(this.location.loc == '/root' && this.location.path == "/") {
          this.dir.setloc(this.location.loc,this.location.path);
        }
      });
    }
  }

  setPath(value: string){
    this.back = false;
    if(value == '/storage/drive'){
      this.dir.setloc('/root','/');
      this.path = "Drive";
    }else if(value == '/storage/shared'){
      this.dir.setloc('/shared','/');
      this.path = "Shared";
    }else {
      this.dir.setloc('/trash','/');
      this.path = "Trash";
    }
  }

  onbackClick() {
    let totpath = this.location.path.split('/');
    this.location.path="/";
    for(let i=1;i<totpath.length-2;i++){
      this.location.path += totpath[i]+'/';
    }
    this.dir.setloc(this.location.loc,this.location.path);
  }
  
  ngOnInit(): void {
    this.setPath(this.router.url);
    this.router.events.subscribe((event: Event)=> {
      if(event instanceof NavigationEnd){
        this.setPath(event.url);
        this.dir.setIcon(this.view);
      }
    })
  }

  onRightClickSupress(e: MouseEvent) {
    e.preventDefault();
  }

  hide_menu(){
    this.dir.hide_menu();
  }

  ngOnDestroy(): void {
    this.locSubs.unsubscribe();
  }

}
