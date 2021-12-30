import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { location } from "../../models/Storage.model";

// @Injectable({providedIn:DirectoryModule})
export class DirectoryService {
  private iconListener = new Subject<string>();
  private location = new Subject<location>();
  private hidemenu = new Subject<boolean>();
  private file!: {location:location,object:string};

  constructor(){}

  setIcon(icon:string){
    this.iconListener.next(icon);
    this.hidemenu.next(true);
  }

  getIcons() {
    return this.iconListener;
  }

  setfile(location:location,object:string){
    this.file={location,object};
  }

  getmarkedfile(){
    return this.file;
  }

  setloc(loc:string,path:string){
    console.log("location set")
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