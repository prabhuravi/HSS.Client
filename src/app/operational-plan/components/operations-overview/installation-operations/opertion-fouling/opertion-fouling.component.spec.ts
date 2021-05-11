import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpertionFoulingComponent } from './opertion-fouling.component';

describe('OpertionFoulingComponent', () => {
  let component: OpertionFoulingComponent;
  let fixture: ComponentFixture<OpertionFoulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpertionFoulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpertionFoulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
