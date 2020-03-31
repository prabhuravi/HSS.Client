import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistCountriesComponent } from './whitelist-countries.component';

describe('WhitelistCountriesComponent', () => {
  let component: WhitelistCountriesComponent;
  let fixture: ComponentFixture<WhitelistCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitelistCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
