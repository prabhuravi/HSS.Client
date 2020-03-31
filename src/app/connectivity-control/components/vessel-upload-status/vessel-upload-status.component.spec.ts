import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselUploadStatusComponent } from './vessel-upload-status.component';

describe('VesselUploadStatusComponent', () => {
  let component: VesselUploadStatusComponent;
  let fixture: ComponentFixture<VesselUploadStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselUploadStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselUploadStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
