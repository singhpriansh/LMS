import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AngularMaterialModule } from './angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogView, HeaderComponent } from './components/ipages/header/header.component';
import { HomeComponent } from './components/ipages/home/home.component';
import { FooterComponent } from './components/ipages/footer/footer.component';
import { SidenavComponent } from './components/ipages/sidenav/sidenav.component';

import { StudentsComponent } from './components/institute/students/students.component';
import { FacultyComponent } from './components/institute/faculty/faculty.component';
import { StudentRegiserationComponent } from './components/institute/students/student-regiseration/student-regiseration.component';
import { FacultyRegiserationComponent } from './components/institute/faculty/faculty-regiseration/faculty-regiseration.component';

import { LoginComponent } from './components/auth/login/login.component';

import { WhatsNewComponent } from './components/ipages/whats-new/whats-new.component';
import { ErrorComponent } from './components/feature/error/error.component';
import { TimetableComponent } from './components/feature/timetable/timetable.component';
import { SyllabusComponent } from './components/feature/syllabus/syllabus.component';
import { ClassesComponent } from './components/classes/classes.component';
import { TestsheetComponent } from './components/feature/testsheet/testsheet.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { EventsComponent } from './components/feature/events/events.component';
import { NoticeComponent } from './components/feature/notice/notice.component';
import { SeminarComponent } from './components/feature/seminar/seminar.component';
import { CalendarComponent } from './components/feature/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, DialogView,
    FooterComponent,
    HomeComponent,
    StudentsComponent,
    FacultyComponent,
    StudentRegiserationComponent,
    FacultyRegiserationComponent,
    LoginComponent,
    WhatsNewComponent,
    ErrorComponent,
    SidenavComponent,
    TimetableComponent,
    SyllabusComponent,
    ClassesComponent,
    TestsheetComponent,
    EventsComponent,
    NoticeComponent,
    SeminarComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [
    MatDatepickerModule,
    // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { background-color : aqua }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
