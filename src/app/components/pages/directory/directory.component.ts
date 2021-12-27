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
        let totpath = res.path.split('/');
        for(let i=0;i<totpath.length-1;i++){
          if(totpath[i]==''){
            this.path += " /";
          }else{
            this.back = true;
            this.path += " "+totpath[i];
          }
        }
      })
    }

  onviewClick() {
    (this.view=='list')?this.view='grid':this.view='list';
    this.dir.setIcon(this.view);
  }

  fileupload(event: any) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if(file){
      const files = new FormData();
      files.append("file",file,file?.name);
      files.append("loc",'Drive')
      this.drive.upload(files)
      .subscribe(res => {
        console.log(res);
      });
    }
  }

  setPath(value: string){
    this.back = false;
    if(value == '/storage/drive'){
      this.dir.setloc('Drive','/');
      this.path = "Drive";
    }else if(value == '/storage/shared'){
      this.dir.setloc('Shared','/');
      this.path = "Shared";
    }else {
      this.dir.setloc('Trash','');
      this.path = "Trash";
    }
  }

  onbackClick() {
    let totpath = this.location.path.split('/');
    this.location.path="/";
    for(let i=0;i<totpath.length-2;i++){
      this.location.path += totpath[i];
    }
    this.dir.setloc(this.location.loc,this.location.path);
    this.setPath(this.router.url);
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

  ngOnDestroy(): void {
    this.locSubs.unsubscribe();
  }

}
