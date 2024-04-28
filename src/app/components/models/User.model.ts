import { ObjectId } from "bson";

export interface User {
  _id: ObjectId;
  user: String;
  name: String;
  picname: String;
  id: Number;
  dobirth: Date;
  gender: String;
  qualdegree: String;
  branch: String;
  dateofadmittion: Date;
  certname: String;
  dojoin: Date;
}