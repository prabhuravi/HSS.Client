import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoulingStateComponent } from './fouling-state.component';
import { ListFoulingStateComponent } from './list-fouling-state/list-fouling-state.component';

describe('FoulingStateComponent', () => {
  let component: FoulingStateComponent;
  let fixture: ComponentFixture<FoulingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      declarations: [ FoulingStateComponent ],
      providers: [ListFoulingStateComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoulingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
