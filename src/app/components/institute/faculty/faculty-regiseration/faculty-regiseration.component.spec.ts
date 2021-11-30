import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyRegiserationComponent } from './faculty-regiseration.component';

describe('FacultyRegiserationComponent', () => {
  let component: FacultyRegiserationComponent;
  let fixture: ComponentFixture<FacultyRegiserationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyRegiserationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyRegiserationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
