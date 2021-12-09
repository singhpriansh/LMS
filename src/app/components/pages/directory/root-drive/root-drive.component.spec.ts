import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootDriveComponent } from './root-drive.component';

describe('RootDriveComponent', () => {
  let component: RootDriveComponent;
  let fixture: ComponentFixture<RootDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
