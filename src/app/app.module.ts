import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogView, HeaderComponent } from './components/ipages/header/header.component';
import { FooterComponent } from './components/ipages/footer/footer.component';
import { AngularMaterialModule } from './angular-material';
import { HomeComponent } from './components/ipages/home/home.component';
import { StudentsComponent } from './components/institute/students/students.component';
import { FacultyComponent } from './components/institute/faculty/faculty.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRegiserationComponent } from './components/institute/students/student-regiseration/student-regiseration.component';
import { FacultyRegiserationComponent } from './components/institute/faculty/faculty-regiseration/faculty-regiseration.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
