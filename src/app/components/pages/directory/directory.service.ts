import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

// @Injectable({providedIn:DirectoryModule})
export class DirectoryService {
  private iconListener = new Subject<string>();
  private location = new Subject<string>();

  constructor(){}

  setIcon(icon:string){
    this.iconListener.next(icon);
  }

  getIcons() {
    return this.iconListener;
  }

  setloc(loc:string){
    this.location.next(loc);
  }

  getloc(){
    return this.location;
  }
}