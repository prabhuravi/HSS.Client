import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondryOperationListingComponent } from './secondry-operation-listing.component';

describe('SecondryOperationListingComponent', () => {
  let component: SecondryOperationListingComponent;
  let fixture: ComponentFixture<SecondryOperationListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondryOperationListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondryOperationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
