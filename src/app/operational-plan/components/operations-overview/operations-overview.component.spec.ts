import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsOverviewComponent } from './operations-overview.component';

describe('OperationsOverviewComponent', () => {
  let component: OperationsOverviewComponent;
  let fixture: ComponentFixture<OperationsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
