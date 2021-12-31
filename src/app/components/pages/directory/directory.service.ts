import { Subject } from "rxjs";
import { default_filclip, fileclip, location } from "../../models/Storage.model";

// @Injectable({providedIn:DirectoryModule})
export class DirectoryService {
  private iconListener = new Subject<string>();
  private location = new Subject<location>();
  private hidemenu = new Subject<boolean>();
  private file: fileclip = default_filclip;

  constructor() {}

  setIcon(icon:string) {
    this.iconListener.next(icon);
    this.hidemenu.next(true);
  }

  getIcons() {
    return this.iconListener;
  }

  setfile(fileclip:fileclip) {
    this.file = JSON.parse(JSON.stringify(fileclip));
  }

  getmarkedfile() {
    const file = this.file;
    if(this.file.cliptype === 'cut'){
      this.file = default_filclip;
    }
    return file;
  }

  setloc(loc:string,path:string) {
    this.location.next({loc:loc,path:path});
    this.hidemenu.next(true);
  }

  getloc() {
    return this.location;
  }

  hide_menu() {
    this.hidemenu.next(true);
  }

  get_menu_not() {
    return this.hidemenu;
  }
}