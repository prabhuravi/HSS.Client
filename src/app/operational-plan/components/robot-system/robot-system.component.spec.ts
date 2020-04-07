import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotSystemComponent } from './robot-system.component';

describe('RobotSystemComponent', () => {
  let component: RobotSystemComponent;
  let fixture: ComponentFixture<RobotSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
