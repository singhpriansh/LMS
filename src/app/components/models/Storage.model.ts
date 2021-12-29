export interface location {
  loc: string;
  path: string;
}

export interface content {
  files: Array<any>,
  folders: Array<any>
}

export interface menudata {
  e: MouseEvent;
  object: any;
  location: location;
}