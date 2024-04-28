import { ObjectId } from "bson";

export interface StudentData {
  _id: ObjectId;
  name: String;
  picname: String;
  id: Number;
  dobirth: Date;
  gender: String;
  qualdegree: String;
  branch: String;
  dateofadmittion: Date;
}