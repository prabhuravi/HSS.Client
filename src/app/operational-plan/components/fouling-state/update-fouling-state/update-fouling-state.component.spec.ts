import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFoulingStateComponent } from './update-fouling-state.component';

describe('UpdateFoulingStateComponent', () => {
  let component: UpdateFoulingStateComponent;
  let fixture: ComponentFixture<UpdateFoulingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFoulingStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFoulingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
