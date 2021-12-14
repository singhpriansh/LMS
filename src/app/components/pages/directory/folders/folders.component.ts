import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DirectoryService } from '../directory.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})

export class FoldersComponent implements OnInit, OnDestroy {
  iconview:string="grid";
  location!: string;
  tiles!:number[];
  private iconStatSub!: Subscription;

  constructor(private dir: DirectoryService,
    private router: Router) {
      this.iconStatSub = this.dir.getIcons()
      .subscribe(icon => {
        this.iconview = icon;
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

  ngOnInit(): void {
    this.onResize();
    this.location = this.router.url;
  }

  ngOnDestroy(): void {
    this.iconStatSub.unsubscribe();
  }
}
