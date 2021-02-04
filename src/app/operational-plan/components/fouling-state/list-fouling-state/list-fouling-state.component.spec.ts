import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoulingStateComponent } from './list-fouling-state.component';

describe('ListFoulingStateComponent', () => {
  let component: ListFoulingStateComponent;
  let fixture: ComponentFixture<ListFoulingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFoulingStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoulingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
