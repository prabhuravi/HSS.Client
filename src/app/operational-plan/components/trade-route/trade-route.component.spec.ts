import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRouteComponent } from './trade-route.component';

describe('TradeRouteComponent', () => {
  let component: TradeRouteComponent;
  let fixture: ComponentFixture<TradeRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
