import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpertionSectionComponent } from './opertion-section.component';

describe('OpertionSectionComponent', () => {
  let component: OpertionSectionComponent;
  let fixture: ComponentFixture<OpertionSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpertionSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpertionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
