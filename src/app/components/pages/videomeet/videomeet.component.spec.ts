import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideomeetComponent } from './videomeet.component';

describe('VideomeetComponent', () => {
  let component: VideomeetComponent;
  let fixture: ComponentFixture<VideomeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideomeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideomeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
