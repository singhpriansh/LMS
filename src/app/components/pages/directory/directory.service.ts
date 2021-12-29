import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

// @Injectable({providedIn:DirectoryModule})
export class DirectoryService {
  private iconListener = new Subject<string>();
  private location = new Subject<{loc:string,path:string}>();
  private hidemenu = new Subject<boolean>();

  constructor(){}

  setIcon(icon:string){
    this.iconListener.next(icon);
    this.hidemenu.next(true);
  }

  getIcons() {
    return this.iconListener;
  }

  setloc(loc:string,path:string){
    this.location.next({loc:loc,path:path});
    this.hidemenu.next(true);
  }

  getloc(){
    return this.location;
  }

  hide_menu(){
    this.hidemenu.next(true);
  }

  get_menu_not(){
    return this.hidemenu;
  }
}