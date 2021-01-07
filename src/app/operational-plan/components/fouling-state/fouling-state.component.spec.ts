import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoulingStateComponent } from './fouling-state.component';

describe('FoulingStateComponent', () => {
  let component: FoulingStateComponent;
  let fixture: ComponentFixture<FoulingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoulingStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoulingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
