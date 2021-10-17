import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/ipages/header/header.component';
import { FooterComponent } from './components/ipages/footer/footer.component';
import { AngularMaterialModule } from './angular-material';
import { HomeComponent } from './components/ipages/home/home.component';
import { StudentsComponent } from './components/routes/students/students.component';
import { FacultyComponent } from './components/routes/faculty/faculty.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StudentsComponent,
    FacultyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
