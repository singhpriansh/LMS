import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AngularMaterialModule } from './angular-material';

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

import { WhatsNewComponent } from './components/feature/whats-new/whats-new.component';
import { ErrorComponent } from './components/feature/error/error.component';
import { TimetableComponent } from './components/ipages/timetable/timetable.component';
import { SyllabusComponent } from './components/ipages/syllabus/syllabus.component';
import { ClassesComponent } from './components/classes/classes.component';

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
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
