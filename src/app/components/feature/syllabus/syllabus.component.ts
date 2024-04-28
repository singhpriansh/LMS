import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  completed() {
    console.log("Shows completed syllabus")
  }
  remaining() {
    console.log("Shows remaining syllabus")
  }
}
