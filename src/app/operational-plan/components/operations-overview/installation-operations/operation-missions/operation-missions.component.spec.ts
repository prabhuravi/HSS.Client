import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationMissionsComponent } from './operation-missions.component';

describe('OperationMissionsComponent', () => {
  let component: OperationMissionsComponent;
  let fixture: ComponentFixture<OperationMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
