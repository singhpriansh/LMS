import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RightClickService } from 'src/app/components/auth/services/click.service';
import { StorageService } from 'src/app/components/auth/services/storage.service';
import { content, location, menudata } from 'src/app/components/models/Storage.model';
import { DirectoryService } from '../directory.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})

export class FoldersComponent implements OnInit, OnDestroy {
  iconview:string="grid";
  url!: string;
  location!: location;
  tiles!:number[];
  content:content={
    files: [],
    folders: []
  };

  private iconStatSub!: Subscription;
  private locSubs!: Subscription;

  constructor(private dir: DirectoryService,
    private storserv: StorageService,
    private rc: RightClickService,
    private router: Router) {
      this.locSubs = this.dir.getloc()
      .subscribe(response => {
        this.location = {
          id: localStorage.getItem("id"),
          loc:response.loc,
          path:response.path
        };
        this.storserv.browse(this.location)
        .subscribe(response => {
          this.content = response.content
        })
      });
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
      if(window.innerWidth<671){
        this.tiles = [0];
      }else{
        this.tiles = [0,1];
      }  
    }
  }

  toreadabledate(dt:string):string {
    let da = new Date(dt).toString();
    let ar = da.split(' ');
    return ar[0]+" "+ar[1]+" "+ar[2]+" "+ar[3];
  }

  readablesize(size:number) : string{
    let type = [" byte"," kb"," mb"," gb"," zb"];
    let i=0;
    while(size>1024){
      i++;
      size/=1024;
    }
    return Math.trunc(size)+type[i];
  }

  onfolderclick(file:string) {
    this.location.path = this.location.path + file+ "/";
    this.dir.setloc(this.location.loc,this.location.path);
  }

  ngOnInit(): void {
    this.iconStatSub = this.dir.getIcons()
    .subscribe(icon => {
      this.iconview = icon;
    });
    this.onResize();
    this.url = this.router.url;
  }

  onRightClick(e:MouseEvent,item:object) {
    this.rc.setdata({
      e:e,
      object:item,
      location:this.location
    });
  }

  ngOnDestroy(): void {
    this.iconStatSub.unsubscribe();
    this.locSubs.unsubscribe();
  }
}
