import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class RightClickService {
  private rightclick= new Subject<any>();

  constructor(){}

  setdata(data:any){
    this.rightclick.next(data);
  }

  get(){
    return this.rightclick;
  }
}