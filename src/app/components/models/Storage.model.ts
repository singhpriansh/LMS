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

export interface fileclip {
  cliptype:string;
  location:location;
  object:string[];
}

export const default_filclip:fileclip = {
  cliptype:'',
  location: {
    loc: '',
    path: ''
  },
  object:[]
};