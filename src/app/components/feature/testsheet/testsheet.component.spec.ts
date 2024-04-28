import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsheetComponent } from './testsheet.component';

describe('TestsheetComponent', () => {
  let component: TestsheetComponent;
  let fixture: ComponentFixture<TestsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
