import { ObjectId } from "bson";

export interface FacultyData {
  _id: ObjectId;
  name: String;
  picname: String;
  id: Number;
  dobirth: Date;
  gender: String;
  qualdegree: String;
  certname: String;
  dojoin: Date;
}