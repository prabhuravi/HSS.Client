import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortMeteorologyComponent } from './port-meteorology.component';

describe('PortMeteorologyComponent', () => {
  let component: PortMeteorologyComponent;
  let fixture: ComponentFixture<PortMeteorologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortMeteorologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortMeteorologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
