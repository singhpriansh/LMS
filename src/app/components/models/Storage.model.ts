export interface location {
  id: string|null;
  loc: string;
  path: string;
}

export interface content {
  files: Array<any>,
  folders: Array<any>
}

export interface menudata {
  e: MouseEvent,
  object: object
  location: location
}