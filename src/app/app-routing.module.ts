import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { FacultyRegiserationComponent } from './components/institute/faculty/faculty-regiseration/faculty-regiseration.component';
import { StudentRegiserationComponent } from './components/institute/students/student-regiseration/student-regiseration.component';
import { HomeComponent } from './components/ipages/home/home.component';
import { WhatsNewComponent } from './components/feature/whats-new/whats-new.component';
import { FacultyComponent } from './components/institute/faculty/faculty.component';
import { StudentsComponent } from './components/institute/students/students.component';
import { ClassesComponent } from './components/classes/classes.component';
import { TestsheetComponent } from './components/feature/testsheet/testsheet.component';
import { EventsComponent } from './components/feature/events/events.component';
import { NoticeComponent } from './components/feature/notice/notice.component';
import { SeminarComponent } from './components/feature/seminar/seminar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faculty-registration', component: FacultyRegiserationComponent },
  { path: 'student-registration', component: StudentRegiserationComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'student', component: StudentsComponent },
  { path: 'classes' ,component: ClassesComponent },
  { path: 'testsheet', component: TestsheetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event', component: EventsComponent },
  { path: 'notice', component: NoticeComponent },
  { path: 'seminar', component: SeminarComponent },
  { path: 'whats-new', component: WhatsNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
