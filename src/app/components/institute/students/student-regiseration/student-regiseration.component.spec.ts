import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegiserationComponent } from './student-regiseration.component';

describe('StudentRegiserationComponent', () => {
  let component: StudentRegiserationComponent;
  let fixture: ComponentFixture<StudentRegiserationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRegiserationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegiserationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
