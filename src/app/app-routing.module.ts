import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { FacultyRegistrationComponent } from './components/institute/faculty/faculty-registration/faculty-registration.component';
import { StudentRegistrationComponent } from './components/institute/students/student-registration/student-registration.component';
import { HomeComponent } from './components/ipages/home/home.component';
import { WhatsNewComponent } from './components/ipages/whats-new/whats-new.component';
import { FacultyComponent } from './components/institute/faculty/faculty.component';
import { StudentsComponent } from './components/institute/students/students.component';
import { ClassesComponent } from './components/institute/classes/classes.component';
import { TestsheetComponent } from './components/feature/testsheet/testsheet.component';
import { EventsComponent } from './components/feature/events/events.component';
import { NoticeComponent } from './components/feature/notice/notice.component';
import { SeminarComponent } from './components/feature/seminar/seminar.component';
import { VideomeetComponent } from './components/pages/videomeet/videomeet.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event', component: EventsComponent },
  { path: 'notice', component: NoticeComponent },
  { path: 'seminar', component: SeminarComponent },
  { path: 'whats-new', component: WhatsNewComponent },
  { path: 'faculty-registration', component: FacultyRegistrationComponent },
  { path: 'student-registration', component: StudentRegistrationComponent },
  { path: 'videomeet', component: VideomeetComponent },
  {
    path: "storage",
    loadChildren: () => import("./components/pages/directory/directory.module")
      .then(m => m.DirectoryModule)
  },
  { path: 'faculty', component: FacultyComponent },
  { path: 'student', component: StudentsComponent },
  { path: 'classes' ,component: ClassesComponent },
  { path: 'testsheet', component: TestsheetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
