import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const BACK_URL = environment.apiUrls;

@Injectable({providedIn: 'root'})
export class SyllabusService {

  constructor(private http: HttpClient) {}

  getSyllabus() {
    return this.http.get<any>(BACK_URL + "syllabus");
  }
}