import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/components/auth/services/storage.service';
import { content } from 'src/app/components/models/Storage.retrieved.model';
import { DirectoryService } from '../directory.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})

export class FoldersComponent implements OnInit, OnDestroy {
  iconview:string="grid";
  url!: string;
  location!: {
    id: string|null,
    loc: string,
    path: string
  };
  tiles!:number[];
  content:content={
    files: [],
    folders: []
  };

  @ViewChild('contextMenu') contextMenu!: ElementRef;

  private iconStatSub!: Subscription;
  private locSubs!: Subscription;
  private menuSubs!: Subscription;

  constructor(private dir: DirectoryService,
    private storserv: StorageService,
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
      this.hideMenu();
    });
    this.menuSubs = this.dir.get_menu_not()
    .subscribe(value => {
      if(value){
        this.hideMenu();
      }
    })
    this.onResize();
    this.url = this.router.url;
  }

  hideMenu() {
    this.contextMenu.nativeElement.style.display = "none";
  }

  onRightClick(e:MouseEvent,item:object) {
    console.log(item);
    e.preventDefault();
    if(this.contextMenu.nativeElement.style.display== "block"){
      this.hideMenu();
    }else{
      this.contextMenu.nativeElement.style.display = "block";
      this.contextMenu.nativeElement.style.left = e.pageX-200 + "px";
      this.contextMenu.nativeElement.style.top = e.pageY-90 + "px";
    }
  }

  ngOnDestroy(): void {
    this.iconStatSub.unsubscribe();
    this.locSubs.unsubscribe();
    this.menuSubs.unsubscribe();
  }
}
