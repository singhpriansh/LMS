import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DirectoryModule } from "./directory.module";

// @Injectable({providedIn:DirectoryModule})
export class IconService {
  private iconListener = new Subject<string>();

  constructor(){}

  setIcon(icon:string){
    this.iconListener.next(icon);
  }

  getIcons() {
    return this.iconListener;
  }
}