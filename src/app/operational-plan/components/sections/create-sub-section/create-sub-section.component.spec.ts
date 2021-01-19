import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubSectionComponent } from './create-sub-section.component';

describe('CreateSubSectionComponent', () => {
  let component: CreateSubSectionComponent;
  let fixture: ComponentFixture<CreateSubSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
